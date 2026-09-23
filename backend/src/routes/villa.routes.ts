import { Router, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.js';
import { VillaService } from '../services/index.js';
import { validate } from '../validators/validate.js';
import { storeVillaSchema, updateVillaSchema } from '../validators/index.js';
import { z } from 'zod';

const router = Router();
const service = new VillaService();

router.get('/', authenticate, authorize('view_villas'), async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.per_page as string) || 10;
    const search = req.query.search ? String(req.query.search) : undefined;
    const isActive = String(req.query.is_active) === 'true' ? true : String(req.query.is_active) === 'false' ? false : undefined;
    const villaTypeId = req.query.villa_type_id ? parseInt(String(req.query.villa_type_id)) : undefined;

    const result = await service.index({ page, perPage, search, isActive, villaTypeId });
    res.json({ success: true, message: 'Data villa berhasil diambil', ...result });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

router.get('/villa-types', authenticate, async (_req: AuthRequest, res: Response) => {
  try {
    const data = await service.getVillaTypes();
    res.json({ success: true, message: 'Tipe villa berhasil diambil', data });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

router.get('/facilities', authenticate, async (_req: AuthRequest, res: Response) => {
  try {
    const data = await service.getFacilities();
    res.json({ success: true, message: 'Fasilitas berhasil diambil', data });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

router.get('/:id', authenticate, authorize('view_villas'), async (req: AuthRequest, res: Response) => {
  try {
    const data = await service.show(parseInt(String(req.params.id)));
    res.json({ success: true, message: 'Detail villa berhasil diambil', data });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

router.post('/', authenticate, authorize('create_villas'), async (req: AuthRequest, res: Response) => {
  try {
    const data = validate(storeVillaSchema, req.body);
    const result = await service.store(data, req.user!.id);
    res.status(201).json({ success: true, message: 'Villa berhasil ditambahkan', data: result });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, errors: err.errors });
  }
});

router.put('/:id', authenticate, authorize('edit_villas'), async (req: AuthRequest, res: Response) => {
  try {
    const data = validate(updateVillaSchema, req.body);
    const result = await service.update(parseInt(String(req.params.id)), data, req.user!.id);
    res.json({ success: true, message: 'Villa berhasil diupdate', data: result });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, errors: err.errors });
  }
});

router.delete('/:id', authenticate, authorize('delete_villas'), async (req: AuthRequest, res: Response) => {
  try {
    await service.destroy(parseInt(String(req.params.id)));
    res.json({ success: true, message: 'Villa berhasil dihapus' });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

export { router as villaRouter };