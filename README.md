## Getting Started

1. Install dependencies

   ```bash
   npm i
   ```

2. Populate environment variables

   ```bash
   # Copy the example env file
   cp .env.example .env.local
   
   # Create auth secret
   npx auth
   ```

3. Generate prisma client

   ```bash
   dotenv -e .env.local -- npx prisma generate
   ```

4. Run application

   ```bash
   npm run dev
   ```