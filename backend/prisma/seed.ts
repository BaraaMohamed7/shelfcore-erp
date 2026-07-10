import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role } from '../src/generated/prisma/client';
import { HashingService } from '../src/common/security/hashing.service';
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const hashingService = new HashingService();

async function main() {
  const adminPasswordHash = await hashingService.hash('Password123!');
  const cashierPasswordHash = await hashingService.hash('Password123!');

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {
      name: 'Admin',
      role: Role.ADMIN,
      isActive: true,
      passwordHash: adminPasswordHash,
    },
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      role: Role.ADMIN,
      passwordHash: adminPasswordHash,
    },
  });

  const cashierUser = await prisma.user.upsert({
    where: { email: 'cashier@example.com' },
    update: {
      name: 'Cashier',
      role: Role.CASHIER,
      isActive: true,
      passwordHash: cashierPasswordHash,
    },
    create: {
      email: 'cashier@example.com',
      name: 'Cashier',
      role: Role.CASHIER,
      passwordHash: cashierPasswordHash,
    },
  });

  console.log('Seeded users:');
  console.log(`Admin user: ${adminUser.email} (password: Password123!)`);
  console.log(`Cashier user: ${cashierUser.email} (password: Password123!)`);
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
