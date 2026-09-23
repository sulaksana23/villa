import { Router, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth.js';
import { DashboardService } from '../services/index.js';

const router = Router();
const service = new DashboardService();

router.get('/', authenticate, authorize('view_dashboard'), async (_req: AuthRequest, res: Response) => {
  try {
    const result = await service.getOverview();
    res.json(result);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

router.get('/occupancy-stats', authenticate, authorize('view_dashboard'), async (_req: AuthRequest, res: Response) => {
  try {
    const result = await service.getOccupancyStats();
    res.json(result);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

router.get('/revenue-stats', authenticate, authorize('view_dashboard'), async (_req: AuthRequest, res: Response) => {
  try {
    const result = await service.getRevenueStats();
    res.json(result);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

router.get('/expense-stats', authenticate, authorize('view_dashboard'), async (_req: AuthRequest, res: Response) => {
  try {
    const result = await service.getExpenseStats();
    res.json(result);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

router.get('/weekly-chart', authenticate, authorize('view_dashboard'), async (_req: AuthRequest, res: Response) => {
  try {
    const result = await service.getWeeklyChart();
    res.json(result);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

router.get('/monthly-chart', authenticate, authorize('view_dashboard'), async (_req: AuthRequest, res: Response) => {
  try {
    const result = await service.getMonthlyChart();
    res.json(result);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message });
  }
});

export { router as dashboardRouter };