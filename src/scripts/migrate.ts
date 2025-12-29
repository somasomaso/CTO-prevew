import { readFileSync } from 'fs';
import { join } from 'path';
import { getClient } from '../config/database';
import dotenv from 'dotenv';

dotenv.config();

const runMigrations = async () => {
  console.log('Starting database migrations...');

  const client = await getClient();

  try {
    await client.query('BEGIN');

    const schemaSQL = readFileSync(
      join(__dirname, '../database/schema.sql'),
      'utf-8'
    );

    await client.query(schemaSQL);

    await client.query('COMMIT');

    console.log('✓ Database schema created successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('✗ Migration failed:', error);
    throw error;
  } finally {
    client.release();
    process.exit(0);
  }
};

runMigrations().catch((error) => {
  console.error('Migration error:', error);
  process.exit(1);
});
