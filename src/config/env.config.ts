import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  BASE_URL: process.env.BASE_URL || 'https://example.com',
  ENV: process.env.ENV || 'dev',
  USERNAME: process.env.USERNAME || '',
  PASSWORD: process.env.PASSWORD || '',
  CI: process.env.CI === 'true',
} as const;
