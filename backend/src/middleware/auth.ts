import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../server.js';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    name: string;
  };
}

export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Token tidak ditemukan' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'fallback-secret';
    const decoded = jwt.verify(token, secret) as { id: number; email: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id, deletedAt: null },
    });

    if (!user) {
      res.status(401).json({ message: 'User tidak ditemukan' });
      return;
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    next();
  } catch {
    res.status(401).json({ message: 'Token tidak valid atau expired' });
  }
}

async function getUserPermissions(userId: number): Promise<Set<string>> {
  const rolePerms = await prisma.$queryRaw<{ name: string }[]>`
    SELECT DISTINCT p.name FROM permissions p
    INNER JOIN role_has_permissions rp ON p.id = rp.permission_id
    INNER JOIN model_has_roles mr ON rp.role_id = mr.role_id
    WHERE mr.model_id = ${userId}
  `;

  const directPerms = await prisma.$queryRaw<{ name: string }[]>`
    SELECT DISTINCT p.name FROM permissions p
    INNER JOIN model_has_permissions mp ON p.id = mp.permission_id
    WHERE mp.model_id = ${userId}
  `;

  const perms = new Set<string>();
  for (const p of rolePerms) perms.add(p.name);
  for (const p of directPerms) perms.add(p.name);
  return perms;
}

async function getUserRoles(userId: number): Promise<string[]> {
  const rows = await prisma.$queryRaw<{ name: string }[]>`
    SELECT r.name FROM roles r
    INNER JOIN model_has_roles mr ON r.id = mr.role_id
    WHERE mr.model_id = ${userId}
  `;
}

export function authorize(...permissions: string[]) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const userPerms = await getUserPermissions(userId);
      const hasAll = permissions.every(p => userPerms.has(p));
      if (!hasAll) {
        res.status(403).json({ message: 'Anda tidak memiliki akses' });
        return;
      }

      next();
    } catch {
      res.status(500).json({ message: 'Terjadi kesalahan saat mengecek otorisasi' });
    }
  };
}

export function roleAuthorize(...roles: string[]) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const userRoles = await getUserRoles(userId);
      const hasRole = roles.some(r => userRoles.includes(r));
      if (!hasRole) {
        res.status(403).json({ message: 'Anda tidak memiliki role yang sesuai' });
        return;
      }

      next();
    } catch {
      res.status(500).json({ message: 'Terjadi kesalahan saat mengecek role' });
    }
  };
}