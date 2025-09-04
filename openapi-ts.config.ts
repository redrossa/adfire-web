import { defineConfig } from '@hey-api/openapi-ts';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: `.env.local` });

export default defineConfig({
  input: process.env.OPENAPI_SPEC_URL!,
  output: 'app/lib/sdk',
  plugins: [
    'zod',
    {
      name: '@hey-api/client-next',
      runtimeConfigPath: './app/lib/hey-api.ts',
    },
    {
      name: '@hey-api/sdk',
      validator: true,
    },
    {
      name: '@hey-api/typescript',
      enums: true, // default false
    },
  ],
});
