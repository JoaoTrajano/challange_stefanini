import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll } from 'vitest'
import { PrismaClient } from '@prisma/client'

import { envSchema } from '@/shared/infrastructure/env/env'

const env = envSchema.parse(process.env)
const schemaId = randomUUID()

function generateUniqueDatabaseURL(schemaId: string) {
  if (!env.DATABASE_URL)
    throw new Error('Por favor, defina a variável de ambiente DATABASE_URL')

  const url = new URL(env.DATABASE_URL)
  url.searchParams.set('schema', schemaId)
  return url.toString()
}

let prisma: PrismaClient

beforeAll(async () => {
  const databaseUrl = generateUniqueDatabaseURL(schemaId)
  process.env.DATABASE_URL = databaseUrl

  try {
    execSync(
      'npx prisma db push --schema=./src/shared/infrastructure/database/postgres/adapters/prisma/schema.prisma',
      {
        stdio: 'inherit',
      }
    )

    prisma = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    })
  } catch (error) {
    console.error('[e2e] Erro ao aplicar migrations:', error)
    process.exit(1)
  }
})

afterAll(async () => {
  if (prisma) {
    try {
      await prisma.$executeRawUnsafe(
        `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`
      )
    } catch (err) {
      console.error('[e2e] Erro ao excluir schema:', err)
    } finally {
      await prisma.$disconnect()
    }
  }
})
