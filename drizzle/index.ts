import { Client } from '@planetscale/database';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import * as schema from './schema';

const client = new Client({
  host: (process.env.DATABASE_HOST as string) ?? '',
  username: (process.env.DATABASE_USERNAME as string) ?? '',
  password: (process.env.DATABASE_PASSWORD as string) ?? '',
});

export const db = drizzle(client, { schema });
