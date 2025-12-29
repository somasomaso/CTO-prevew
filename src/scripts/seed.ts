import { readFileSync } from 'fs';
import { join } from 'path';
import { getClient } from '../config/database';
import dotenv from 'dotenv';

dotenv.config();

const runSeed = async () => {
  console.log('Starting database seeding...');

  const client = await getClient();

  try {
    await client.query('BEGIN');

    const seedSQL = readFileSync(
      join(__dirname, '../database/seed.sql'),
      'utf-8'
    );

    await client.query(seedSQL);

    await client.query('COMMIT');

    console.log('✓ Database seeded successfully');
    console.log('');
    console.log('Default admin credentials:');
    console.log('  Email: admin@example.com');
    console.log('  Password: Admin123!');
    console.log('');
    console.log('⚠️  Please change the default admin password immediately!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('✗ Seeding failed:', error);
    throw error;
  } finally {
    client.release();
    process.exit(0);
  }
};

runSeed().catch((error) => {
  console.error('Seeding error:', error);
  process.exit(1);
});
