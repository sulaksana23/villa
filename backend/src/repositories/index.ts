import { PrismaClient, RoomStatus, RoomAvailability } from '@prisma/client';
import type { ApiResponse, PaginatedResponse } from '../types/response.js';
import { prisma } from '../server.js';

export class DashboardRepository {
  async getLatestMetrics() {
    return prisma.dashboardMetric.findFirst({
      where: { deletedAt: null },
      orderBy: { metricDate: 'desc' },
    });
  }

  async getMetricsByDateRange(startDate: Date, endDate: Date) {
    return prisma.dashboardMetric.findMany({
      where: {
        metricDate: { gte: startDate, lte: endDate },
        deletedAt: null,
      },
      orderBy: { metricDate: 'asc' },
    });
  }

  async getWeeklyChart() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return prisma.dashboardMetric.findMany({
      where: { metricDate: { gte: sevenDaysAgo }, deletedAt: null },
      orderBy: { metricDate: 'asc' },
    });
  }

  async getMonthlyChart() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return prisma.dashboardMetric.findMany({
      where: { metricDate: { gte: thirtyDaysAgo }, deletedAt: null },
      orderBy: { metricDate: 'asc' },
    });
  }

  async getOccupancyStats() {
    const totalRooms = await prisma.room.count({ where: { isActive: true, deletedAt: null } });
    const occupiedRooms = await prisma.room.count({ where: { status: 'occupied', isActive: true, deletedAt: null } });
    const availableRooms = await prisma.room.count({ where: { status: 'available', isActive: true, deletedAt: null } });
    const reservedRooms = await prisma.room.count({ where: { status: 'reserved', isActive: true, deletedAt: null } });
    const cleaningRooms = await prisma.room.count({ where: { status: 'cleaning', isActive: true, deletedAt: null } });
    const maintenanceRooms = await prisma.room.count({ where: { status: 'maintenance', isActive: true, deletedAt: null } });

    return {
      totalRooms,
      occupiedRooms,
      availableRooms,
      reservedRooms,
      cleaningRooms,
      maintenanceRooms,
      occupancyRate: totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0,
    };
  }

  async getRevenueStats() {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const metrics = await prisma.dashboardMetric.findMany({
      where: {
        metricDate: { gte: startOfMonth },
        deletedAt: null,
      },
    });

    let totalRevenue = 0;
    let todayRevenue = 0;
    const todayStr = today.toISOString().split('T')[0];

    for (const m of metrics) {
      totalRevenue += Number(m.dailyRevenue);
      if (m.metricDate.toISOString().split('T')[0] === todayStr) {
        todayRevenue = Number(m.dailyRevenue);
      }
    }

    return { totalRevenue, todayRevenue };
  }

  async getExpenseStats() {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const metrics = await prisma.dashboardMetric.findMany({
      where: {
        metricDate: { gte: startOfMonth },
        deletedAt: null,
      },
    });

    let totalExpenses = 0;
    let todayExpenses = 0;
    const todayStr = today.toISOString().split('T')[0];

    for (const m of metrics) {
      totalExpenses += Number(m.dailyExpenses);
      if (m.metricDate.toISOString().split('T')[0] === todayStr) {
        todayExpenses = Number(m.dailyExpenses);
      }
    }

    return { totalExpenses, todayExpenses };
  }
}

export class VillaRepository {
  async findAll(params: { page: number; perPage: number; search?: string; isActive?: boolean; villaTypeId?: number }) {
    const { page, perPage, search, isActive, villaTypeId } = params;
    const skip = (page - 1) * perPage;

    const where: any = { deletedAt: null };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (isActive !== undefined) where.isActive = isActive;
    if (villaTypeId) where.villaTypeId = villaTypeId;

    const [data, total] = await Promise.all([
      prisma.villa.findMany({
        where,
        skip,
        take: perPage,
        include: {
          villaType: true,
          images: { where: { isPrimary: true }, take: 1 },
          _count: { select: { rooms: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.villa.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    };
  }

  async findById(id: number) {
    return prisma.villa.findFirst({
      where: { id, deletedAt: null },
        include: {
          villaType: true,
          images: { orderBy: { sortOrder: 'asc' } },
          facilityLinks: { include: { facility: true } },
          availabilities: { orderBy: { availableFrom: 'asc' } },
          rooms: { where: { deletedAt: null }, include: { roomType: true } },
        },
    });
  }

  async create(data: any, userId: number) {
    const { facilityIds, ...villaData } = data;
    return prisma.villa.create({
      data: {
        ...villaData,
        createdBy: userId,
        updatedBy: userId,
        facilities: facilityIds ? {
          create: facilityIds.map((id: number) => ({
            facility: { connect: { id } },
          })),
        } : undefined,
      },
      include: { villaType: true, facilityLinks: { include: { facility: true } } },
    });
  }

  async update(id: number, data: any, userId: number) {
    const { facilityIds, ...villaData } = data;
    return prisma.villa.update({
      where: { id },
      data: {
        ...villaData,
        updatedBy: userId,
        facilityLinks: facilityIds ? {
          deleteMany: {},
          create: facilityIds.map((fid: number) => ({
            facility: { connect: { id: fid } },
          })),
        } : undefined,
      },
      include: { villaType: true, facilityLinks: { include: { facility: true } } },
    });
  }

  async delete(id: number) {
    return prisma.villa.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findActiveVillaTypes() {
    return prisma.villaType.findMany({
      where: { isActive: true, deletedAt: null },
      orderBy: { name: 'asc' },
    });
  }

  async findAllFacilities() {
    return prisma.facility.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }
}

export class RoomRepository {
  async findAll(params: {
    page: number;
    perPage: number;
    search?: string;
    villaId?: number;
    status?: string;
    roomTypeId?: number;
  }) {
    const { page, perPage, search, villaId, status, roomTypeId } = params;
    const skip = (page - 1) * perPage;

    const where: any = { deletedAt: null };
    if (search) {
      where.roomNumber = { contains: search, mode: 'insensitive' };
    }
    if (villaId) where.villaId = villaId;
    if (status) where.status = status;
    if (roomTypeId) where.roomTypeId = roomTypeId;

    const [data, total] = await Promise.all([
      prisma.room.findMany({
        where,
        skip,
        take: perPage,
        include: {
          villa: { select: { id: true, name: true } },
          roomType: true,
          images: { where: { isPrimary: true }, take: 1 },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.room.count({ where }),
    ]);

    return {
      data,
      meta: { page, perPage, total, totalPages: Math.ceil(total / perPage) },
    };
  }

  async findById(id: number) {
    return prisma.room.findFirst({
      where: { id, deletedAt: null },
      include: {
        villa: true,
        roomType: true,
        images: { where: { isPrimary: true }, take: 1 },
        amenityLinks: { include: { amenity: true } },
        pricing: { where: { isActive: true }, orderBy: { validFrom: 'desc' } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: any, userId: number) {
    const { amenityIds, ...roomData } = data;
    return prisma.room.create({
      data: {
        ...roomData,
        createdBy: userId,
        updatedBy: userId,
        amenities: amenityIds ? {
          create: amenityIds.map((id: number) => ({
            amenity: { connect: { id } },
          })),
        } : undefined,
      },
      include: { villa: true, roomType: true, amenityLinks: { include: { amenity: true } } },
    });
  }

  async update(id: number, data: any, userId: number) {
    const { amenityIds, ...roomData } = data;
    return prisma.room.update({
      where: { id },
      data: {
        ...roomData,
        updatedBy: userId,
        amenityLinks: amenityIds ? {
          deleteMany: {},
          create: amenityIds.map((id: number) => ({
            amenity: { connect: { id } },
          })),
        } : undefined,
      },
      include: { villa: true, roomType: true, amenityLinks: { include: { amenity: true } } },
    });
  }

  async updateStatus(id: number, status: string) {
    return prisma.room.update({
      where: { id },
      data: { status: status as RoomStatus },
      include: { villa: true, roomType: true },
    });
  }

  async delete(id: number) {
    return prisma.room.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findActiveRoomTypes() {
    return prisma.roomType.findMany({
      where: { isActive: true, deletedAt: null },
      orderBy: { name: 'asc' },
    });
  }

  async findAllAmenities() {
    return prisma.amenity.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findActiveVillas() {
    return prisma.villa.findMany({
      where: { isActive: true, isAvailable: true, deletedAt: null },
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    });
  }
}
