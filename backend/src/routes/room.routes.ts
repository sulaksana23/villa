import { Router, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.js';
import { RoomService } from '../services/index.js';
import { validate } from '../validators/validate.js';
import { storeRoomSchema, updateRoomSchema, updateRoomStatusSchema } from '../validators/index.js';

const router = Router();
const service = new RoomService();

router.get('/', authenticate, authorize('view_rooms'), async (req: AuthRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.per_page as string) || 10;
    const search = req.query.search as string | undefined;
    const villaId = req.query.villa_id ? parseInt(String(req.query.villa_id)) : undefined;
    const status = req.query.status ? String(req.query.status) : undefined;
    const roomTypeId = req.query.room_type_id ? parseInt(String(req.query.room_type_id)) : undefined;

    const result = await service.index({ page, perPage, search, villaId, status, roomTypeId });
    res.json({ success: true, message: 'Data kamar berhasil diambil', ...result });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

router.get('/room-types', authenticate, async (_req: AuthRequest, res: Response) => {
  try {
    const data = await service.getRoomTypes();
    res.json({ success: true, message: 'Tipe kamar berhasil diambil', data });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

router.get('/amenities', authenticate, async (_req: AuthRequest, res: Response) => {
  try {
    const data = await service.getAmenities();
    res.json({ success: true, message: 'Amenitas berhasil diambil', data });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

router.get('/villas', authenticate, async (_req: AuthRequest, res: Response) => {
  try {
    const data = await service.getVillas();
    res.json({ success: true, message: 'Daftar villa berhasil diambil', data });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

router.get('/:id', authenticate, authorize('view_rooms'), async (req: AuthRequest, res: Response) => {
  try {
    const data = await service.show(parseInt(String(req.params.id)));
    res.json({ success: true, message: 'Detail kamar berhasil diambil', data });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

router.post('/', authenticate, authorize('create_rooms'), async (req: AuthRequest, res: Response) => {
  try {
    const data = validate(storeRoomSchema, req.body);
    const result = await service.store(data, req.user!.id);
    res.status(201).json({ success: true, message: 'Kamar berhasil ditambahkan', data: result });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, errors: err.errors });
  }
});

router.put('/:id', authenticate, authorize('edit_rooms'), async (req: AuthRequest, res: Response) => {
  try {
    const data = validate(updateRoomSchema, req.body);
    const result = await service.update(parseInt(String(req.params.id)), data, req.user!.id);
    res.json({ success: true, message: 'Kamar berhasil diupdate', data: result });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, errors: err.errors });
  }
});

router.patch('/:id/status', authenticate, authorize('edit_rooms'), async (req: AuthRequest, res: Response) => {
  try {
    const data = validate(updateRoomStatusSchema, req.body);
    const result = await service.updateStatus(parseInt(String(req.params.id)), data.status);
    res.json({ success: true, message: 'Status kamar berhasil diupdate', data: result });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, errors: err.errors });
  }
});

router.delete('/:id', authenticate, authorize('delete_rooms'), async (req: AuthRequest, res: Response) => {
  try {
    await service.destroy(parseInt(String(req.params.id)));
    res.json({ success: true, message: 'Kamar berhasil dihapus' });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

export { router as roomRouter };