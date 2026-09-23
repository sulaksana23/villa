import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../server.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { validate } from '../validators/validate.js';
import { loginSchema, registerSchema } from '../validators/index.js';

const router = Router();

function generateToken(user: { id: number; email: string }) {
  const secret = process.env.JWT_SECRET || 'fallback-secret';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn } as any);
}

router.post('/login', async (req: Request, res: Response) => {
  try {
    const data = validate(loginSchema, req.body);

    const user = await prisma.user.findUnique({
      where: { email: data.email, deletedAt: null },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      res.status(401).json({ success: false, message: 'Email atau password salah' });
      return;
    }

    const [roles, permissions] = await Promise.all([
      prisma.$queryRaw<{ name: string }[]>`SELECT r.name FROM roles r INNER JOIN model_has_roles mr ON r.id = mr.role_id WHERE mr.model_id = ${user.id}`,
      prisma.$queryRaw<{ name: string }[]>`SELECT DISTINCT p.name FROM permissions p LEFT JOIN role_has_permissions rp ON p.id = rp.permission_id LEFT JOIN model_has_roles mr ON rp.role_id = mr.role_id AND mr.model_id = ${user.id} LEFT JOIN model_has_permissions mp ON p.id = mp.permission_id AND mp.model_id = ${user.id} WHERE mr.model_id IS NOT NULL OR mp.model_id IS NOT NULL`,
    ]);

    const token = generateToken({ id: user.id, email: user.email });

    res.json({
      success: true,
      message: 'Login berhasil',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          roles: roles.map(r => r.name),
          permissions: permissions.map(p => p.name),
        },
      },
    });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const data = validate(registerSchema, req.body);

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      res.status(409).json({ success: false, message: 'Email sudah terdaftar' });
      return;
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        address: data.address,
      },
    });

    const token = generateToken({ id: user.id, email: user.email });

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      data: { token, user: { id: user.id, name: user.name, email: user.email } },
    });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }
});

router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id, deletedAt: null },
    });

    if (!user) {
      res.status(404).json({ success: false, message: 'User tidak ditemukan' });
      return;
    }

    const [roles, permissions] = await Promise.all([
      prisma.$queryRaw<{ name: string }[]>`SELECT r.name FROM roles r INNER JOIN model_has_roles mr ON r.id = mr.role_id WHERE mr.model_id = ${user.id}`,
      prisma.$queryRaw<{ name: string }[]>`SELECT DISTINCT p.name FROM permissions p LEFT JOIN role_has_permissions rp ON p.id = rp.permission_id LEFT JOIN model_has_roles mr ON rp.role_id = mr.role_id AND mr.model_id = ${user.id} LEFT JOIN model_has_permissions mp ON p.id = mp.permission_id AND mp.model_id = ${user.id} WHERE mr.model_id IS NOT NULL OR mp.model_id IS NOT NULL`,
    ]);

    res.json({
      success: true,
      message: 'Profile berhasil diambil',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        roles: roles.map((r: { name: string }) => r.name),
        permissions: permissions.map((p: { name: string }) => p.name),
      },
    });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

export { router as authRouter };