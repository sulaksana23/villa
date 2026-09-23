import { DashboardRepository, VillaRepository, RoomRepository } from '../repositories/index.js';
import type { ApiResponse } from '../types/response.js';
import { prisma } from '../server.js';

export class DashboardService {
  private repo = new DashboardRepository();

  async getOverview(): Promise<ApiResponse> {
    const [occupancy, revenue, expenses] = await Promise.all([
      this.repo.getOccupancyStats(),
      this.repo.getRevenueStats(),
      this.repo.getExpenseStats(),
    ]);

    const totalProfit = revenue.totalRevenue - expenses.totalExpenses;
    const latestMetric = await this.repo.getLatestMetrics();

    return {
      success: true,
      message: 'Dashboard overview berhasil diambil',
      data: {
        occupancy,
        revenue,
        expenses,
        totalProfit,
        upcoming: {
          checkins: latestMetric?.checkinCount || 0,
          checkouts: latestMetric?.checkoutCount || 0,
          maintenancePending: latestMetric?.maintenancePending || 0,
          housekeepingPending: latestMetric?.housekeepingPending || 0,
        },
      },
    };
  }

  async getOccupancyStats(): Promise<ApiResponse> {
    const data = await this.repo.getOccupancyStats();
    return { success: true, message: 'Statistik okupansi berhasil diambil', data };
  }

  async getRevenueStats(): Promise<ApiResponse> {
    const data = await this.repo.getRevenueStats();
    return { success: true, message: 'Statistik pendapatan berhasil diambil', data };
  }

  async getExpenseStats(): Promise<ApiResponse> {
    const data = await this.repo.getExpenseStats();
    return { success: true, message: 'Statistik pengeluaran berhasil diambil', data };
  }

  async getWeeklyChart(): Promise<ApiResponse> {
    const data = await this.repo.getWeeklyChart();
    return {
      success: true,
      message: 'Data chart mingguan berhasil diambil',
      data: data.map(m => ({
        date: m.metricDate,
        revenue: Number(m.dailyRevenue),
        expenses: Number(m.dailyExpenses),
        profit: Number(m.dailyProfit),
        occupancy: m.totalRooms > 0 ? Math.round((m.totalOccupancy / m.totalRooms) * 100) : 0,
      })),
    };
  }

  async getMonthlyChart(): Promise<ApiResponse> {
    const data = await this.repo.getMonthlyChart();
    return {
      success: true,
      message: 'Data chart bulanan berhasil diambil',
      data: data.map(m => ({
        date: m.metricDate,
        revenue: Number(m.dailyRevenue),
        expenses: Number(m.dailyExpenses),
        profit: Number(m.dailyProfit),
        occupancy: m.totalRooms > 0 ? Math.round((m.totalOccupancy / m.totalRooms) * 100) : 0,
      })),
    };
  }
}

export class VillaService {
  private repo = new VillaRepository();

  async index(params: { page: number; perPage: number; search?: string; isActive?: boolean; villaTypeId?: number }) {
    return this.repo.findAll(params);
  }

  async show(id: number) {
    const villa = await this.repo.findById(id);
    if (!villa) {
      const err = new Error('Villa tidak ditemukan') as any;
      err.statusCode = 404;
      throw err;
    }
    return villa;
  }

  async store(data: any, userId: number) {
    return this.repo.create(data, userId);
  }

  async update(id: number, data: any, userId: number) {
    await this.show(id);
    return this.repo.update(id, data, userId);
  }

  async destroy(id: number) {
    await this.show(id);
    return this.repo.delete(id);
  }

  async getVillaTypes() {
    return this.repo.findActiveVillaTypes();
  }

  async getFacilities() {
    return this.repo.findAllFacilities();
  }
}

export class RoomService {
  private repo = new RoomRepository();

  async index(params: {
    page: number;
    perPage: number;
    search?: string;
    villaId?: number;
    status?: string;
    roomTypeId?: number;
  }) {
    return this.repo.findAll(params);
  }

  async show(id: number) {
    const room = await this.repo.findById(id);
    if (!room) {
      const err = new Error('Kamar tidak ditemukan') as any;
      err.statusCode = 404;
      throw err;
    }
    return room;
  }

  async store(data: any, userId: number) {
    return this.repo.create(data, userId);
  }

  async update(id: number, data: any, userId: number) {
    await this.show(id);
    return this.repo.update(id, data, userId);
  }

  async updateStatus(id: number, status: string) {
    await this.show(id);
    return this.repo.updateStatus(id, status);
  }

  async destroy(id: number) {
    await this.show(id);
    return this.repo.delete(id);
  }

  async getRoomTypes() {
    return this.repo.findActiveRoomTypes();
  }

  async getAmenities() {
    return this.repo.findAllAmenities();
  }

  async getVillas() {
    return this.repo.findActiveVillas();
  }
}
