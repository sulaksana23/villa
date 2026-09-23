import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const permissions = [
    'view_dashboard',
    'view_villas', 'create_villas', 'edit_villas', 'delete_villas',
    'view_rooms', 'create_rooms', 'edit_rooms', 'delete_rooms',
    'view_guests', 'create_guests', 'edit_guests', 'delete_guests',
    'view_reservations', 'create_reservations', 'edit_reservations', 'delete_reservations',
    'view_housekeeping', 'manage_housekeeping',
    'view_maintenance', 'manage_maintenance',
    'view_revenue', 'manage_revenue',
    'view_expenses', 'manage_expenses',
    'view_reports', 'export_reports',
    'view_users', 'create_users', 'edit_users', 'delete_users',
    'view_roles', 'manage_roles',
    'view_settings', 'manage_settings',
  ];

  console.log('Creating permissions...');
  for (const name of permissions) {
    await prisma.permission.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const allPermissions = await prisma.permission.findMany();
  const permMap = new Map(allPermissions.map(p => [p.name, p.id]));

  console.log('Creating roles...');
  const roleNames = ['super_admin', 'owner', 'manager', 'receptionist', 'housekeeping', 'maintenance', 'accountant'];
  for (const name of roleNames) {
    await prisma.role.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const roles = await prisma.role.findMany();
  const roleMap = new Map(roles.map(r => [r.name, r.id]));

  console.log('Assigning permissions to roles...');

  const superAdminPerms = allPermissions.map(p => ({ permissionId: p.id, roleId: roleMap.get('super_admin')! }));
  await prisma.roleHasPermissions.createMany({ data: superAdminPerms, skipDuplicates: true });

  const ownerPerms = ['view_dashboard', 'view_villas', 'create_villas', 'edit_villas', 'delete_villas', 'view_rooms', 'create_rooms', 'edit_rooms', 'delete_rooms', 'view_guests', 'view_reservations', 'create_reservations', 'edit_reservations', 'delete_reservations', 'view_housekeeping', 'view_maintenance', 'view_revenue', 'view_expenses', 'view_reports', 'export_reports', 'view_users', 'view_settings', 'manage_settings'];
  for (const pName of ownerPerms) {
    if (permMap.has(pName)) {
      await prisma.roleHasPermissions.create({
        data: { permissionId: permMap.get(pName)!, roleId: roleMap.get('owner')! },
      });
    }
  }

  console.log('Creating users...');
  const users = [
    { name: 'Super Admin', email: 'admin@villa.test', password: 'password', role: 'super_admin' },
    { name: 'Villa Owner', email: 'owner@villa.test', password: 'password', role: 'owner' },
    { name: 'Manager', email: 'manager@villa.test', password: 'password', role: 'manager' },
    { name: 'Receptionist', email: 'receptionist@villa.test', password: 'password', role: 'receptionist' },
  ];

  for (const u of users) {
    const hashedPassword = await bcrypt.hash(u.password, 12);
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { name: u.name, email: u.email, password: hashedPassword },
    });

    await prisma.modelHasRoles.create({
      data: { roleId: roleMap.get(u.role)!, modelType: 'User', modelId: user.id },
    });
  }

  console.log('Creating villa types...');
  const villaTypes = [
    { name: 'Standard Villa', description: 'Villa standar dengan fasilitas lengkap', maxGuests: 4, bedrooms: 2, bathrooms: 1, basePrice: 1500000 },
    { name: 'Deluxe Villa', description: 'Villa deluxe dengan private pool', maxGuests: 6, bedrooms: 3, bathrooms: 2, basePrice: 3000000 },
    { name: 'Premium Villa', description: 'Villa premium luxury dengan ocean view', maxGuests: 8, bedrooms: 4, bathrooms: 3, basePrice: 5000000 },
    { name: 'Royal Villa', description: 'Villa royal terluks dengan semua fasilitas', maxGuests: 12, bedrooms: 6, bathrooms: 5, basePrice: 10000000 },
  ];

  for (const vt of villaTypes) {
    await prisma.villaType.upsert({
      where: { name: vt.name },
      update: {},
      create: vt,
    });
  }

  console.log('Creating villas...');
  const admin = await prisma.user.findUnique({ where: { email: 'admin@villa.test' } });
  const types = await prisma.villaType.findMany();

  if (types.length > 0 && admin) {
    const villas = [
      { name: 'Villa Sunset Paradise', description: 'Villa indah dengan pemandangan sunset', villaTypeId: types[0].id, location: 'Bali', address: 'Jl. Sunset Road No. 1, Seminyak', pricePerNight: 1500000, maxGuests: 4, bedrooms: 2, bathrooms: 1, totalRooms: 3, amenities: 'WiFi, AC, TV, Kitchen' },
      { name: 'Villa Ocean Breeze', description: 'Villa mewah di tepi pantai', villaTypeId: types[1].id, location: 'Bali', address: 'Jl. Pantai Kuta No. 10', pricePerNight: 3000000, maxGuests: 6, bedrooms: 3, bathrooms: 2, totalRooms: 4, amenities: 'WiFi, AC, TV, Kitchen, Private Pool' },
      { name: 'Villa Mountain Retreat', description: 'Villa tenang di pegunungan', villaTypeId: types[2].id, location: 'Bandung', address: 'Jl. Dago Pakar No. 5', pricePerNight: 5000000, maxGuests: 8, bedrooms: 4, bathrooms: 3, totalRooms: 5, amenities: 'WiFi, AC, TV, Kitchen, Private Pool, Garden' },
    ];

    for (const v of villas) {
      await prisma.villa.upsert({
        where: { name: v.name },
        update: {},
        create: { ...v, createdBy: admin.id, updatedBy: admin.id },
      });
    }
  }

  console.log('Creating room types...');
  const roomTypes = [
    { name: 'Standard Room', description: 'Kamar standar nyaman', basePrice: 500000, maxGuests: 2 },
    { name: 'Deluxe Room', description: 'Kamar deluxe dengan balkon', basePrice: 1000000, maxGuests: 3 },
    { name: 'Suite Room', description: 'Kamar suite luas', basePrice: 2000000, maxGuests: 4 },
    { name: 'Presidential Suite', description: 'Suite paling mewah', basePrice: 5000000, maxGuests: 4 },
  ];

  for (const rt of roomTypes) {
    await prisma.roomType.upsert({
      where: { name: rt.name },
      update: {},
      create: rt,
    });
  }

  console.log('Creating facilities...');
  const facilities = [
    { name: 'WiFi', icon: 'wifi', description: 'Internet nirkabel gratis' },
    { name: 'AC', icon: 'snowflake', description: 'Pendingin ruangan' },
    { name: 'TV', icon: 'tv', description: 'Televisi LED' },
    { name: 'Private Pool', icon: 'water', description: 'Kolam renang pribadi' },
    { name: 'Kitchen', icon: 'cooking-pot', description: 'Dapur lengkap' },
    { name: 'Garden', icon: 'trees', description: 'Taman pribadi' },
    { name: 'Parking', icon: 'car', description: 'Area parkir' },
    { name: 'Security', icon: 'shield', description: 'Keamanan 24 jam' },
  ];

  for (const f of facilities) {
    await prisma.facility.upsert({
      where: { name: f.name },
      update: {},
      create: f,
    });
  }

  console.log('Creating amenities...');
  const amenities = [
    { name: 'King Bed', icon: 'bed-double', description: 'Tempat tidur king size' },
    { name: 'Mini Bar', icon: 'wine', description: 'Mini bar lengkap' },
    { name: 'Safe Box', icon: 'lock', description: 'Brankas pribadi' },
    { name: 'Bathrobe', icon: 'shirt', description: 'Bathroom lengkap dengan bathrobe' },
    { name: 'Hair Dryer', icon: 'wind', description: 'Pengering rambut' },
    { name: 'Coffee Maker', icon: 'coffee', description: 'Mesin kopi' },
  ];

  for (const a of amenities) {
    await prisma.amenity.upsert({
      where: { name: a.name },
      update: {},
      create: a,
    });
  }

  console.log('Creating rooms...');
  const villaList = await prisma.villa.findMany();
  const rTypes = await prisma.roomType.findMany();

  if (villaList.length > 0 && rTypes.length > 0 && admin) {
    let roomNum = 101;
    for (const villa of villaList) {
      for (let i = 0; i < Math.min(3, rTypes.length); i++) {
        await prisma.room.upsert({
          where: { roomNumber: `${roomNum}` },
          update: {},
          create: {
            roomNumber: `${roomNum}`,
            villaId: villa.id,
            roomTypeId: rTypes[i].id,
            maxGuests: rTypes[i].maxGuests,
            pricePerNight: rTypes[i].basePrice,
            status: i === 0 ? 'available' : i === 1 ? 'occupied' : 'cleaning',
            floorNumber: 1,
            createdBy: admin.id,
            updatedBy: admin.id,
          },
        });
        roomNum++;
      }
    }
  }

  console.log('Seeding completed!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
