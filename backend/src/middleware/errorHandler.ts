import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error('Error:', err.message);

  if (err.name === 'ZodError') {
    res.status(422).json({
      message: 'Validasi gagal',
      errors: (err as any).errors || err.message,
    });
    return;
  }

  const status = (err as any).statusCode || 500;
  res.status(status).json({
    message: status === 500 ? 'Terjadi kesalahan pada server' : err.message,
  });
}