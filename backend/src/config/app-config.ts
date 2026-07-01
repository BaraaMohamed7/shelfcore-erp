import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  database_url: process.env.DATABASE_URL,
}));
