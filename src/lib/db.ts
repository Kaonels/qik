import { PrismaClient } from '@prisma/client'

// Singleton-safe Prisma client. In serverless environments (Vercel) the client
// is recreated per invocation; in dev we cache on globalThis to avoid
// exhausting connections during hot-reload.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV !== 'production' ? ['query', 'error', 'warn'] : ['error'],
    })
  } catch (e) {
    // In environments where the DB is not available (e.g., Vercel build),
    // return null-safe fallback. The dashboard itself does not depend on the DB —
    // it uses the LLM-powered API routes for live data.
    console.warn('Prisma client not available:', e)
    return null as unknown as PrismaClient
  }
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
