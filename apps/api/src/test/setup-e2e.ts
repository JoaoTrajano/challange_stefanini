import { envSchema } from '@/shared/infrastructure/env/env'
import { config } from 'dotenv'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll } from 'vitest'

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

const env = envSchema.parse(process.env)
const schemaId = randomUUID()
let prisma: any // só define depois

function generateUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL)
    throw new Error('Please provide a DATABASE_URL environment variable')

  const url = new URL(env.DATABASE_URL)
  url.searchParams.set('schema', schemaId)
  return url.toString()
}

beforeAll(async () => {
  const testDbUrl = generateUniqueDatabaseURL(schemaId)

  execSync(
    'pnpm prisma db push --schema=./src/shared/infrastructure/database/postgres/adapters/prisma/schema.prisma',
    {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: testDbUrl,
      },
    }
  )

  // Agora inicializa com a URL correta
  const { PrismaClient } = await import('@prisma/client')
  prisma = new PrismaClient({
    datasources: { db: { url: testDbUrl } },
  })
})

afterAll(async () => {
  if (prisma) {
    await prisma.$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`
    )
    await prisma.$disconnect()
  }
})
