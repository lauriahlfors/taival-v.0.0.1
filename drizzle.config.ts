import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  driver: 'mysql2',
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations',
  dbCredentials: {
    uri: (process.env.DATABASE_URL as string) ?? '',
  },
  verbose: true,
  strict: true,
} satisfies Config;
