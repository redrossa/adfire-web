import { CreateClientConfig } from '@/app/lib/sdk/client.gen';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});
