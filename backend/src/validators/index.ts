import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const storeVillaSchema = z.object({
  name: z.string().min(2, 'Nama villa minimal 2 karakter'),
  description: z.string().optional(),
  villaTypeId: z.number().int().positive('Tipe villa harus dipilih'),
  location: z.string().optional(),
  address: z.string().optional(),
  pricePerNight: z.number().positive('Harga per malam harus lebih dari 0'),
  maxGuests: z.number().int().min(1).default(1),
  bedrooms: z.number().int().min(1).default(1),
  bathrooms: z.number().int().min(1).default(1),
  totalRooms: z.number().int().min(0).default(0),
  amenities: z.string().optional(),
  isActive: z.boolean().default(true),
  isAvailable: z.boolean().default(true),
  facilityIds: z.array(z.number()).optional(),
});

export const updateVillaSchema = storeVillaSchema.partial();

export const storeRoomSchema = z.object({
  roomNumber: z.string().min(1, 'Nomor kamar wajib diisi'),
  villaId: z.number().int().positive('Villa harus dipilih'),
  roomTypeId: z.number().int().positive('Tipe kamar harus dipilih'),
  status: z.enum(['available', 'occupied', 'reserved', 'cleaning', 'maintenance']).default('available'),
  availability: z.enum(['available', 'unavailable']).default('available'),
  maxGuests: z.number().int().min(1).default(1),
  pricePerNight: z.number().positive('Harga per malam harus lebih dari 0'),
  description: z.string().optional(),
  floorNumber: z.number().int().optional(),
  isActive: z.boolean().default(true),
  amenityIds: z.array(z.number()).optional(),
});

export const updateRoomSchema = storeRoomSchema.partial();

export const updateRoomStatusSchema = z.object({
  status: z.enum(['available', 'occupied', 'reserved', 'cleaning', 'maintenance']),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type StoreVillaInput = z.infer<typeof storeVillaSchema>;
export type UpdateVillaInput = z.infer<typeof updateVillaSchema>;
export type StoreRoomInput = z.infer<typeof storeRoomSchema>;
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>;
export type UpdateRoomStatusInput = z.infer<typeof updateRoomStatusSchema>;