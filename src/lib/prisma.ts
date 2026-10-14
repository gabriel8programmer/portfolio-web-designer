import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;
  const databaseUrl = process.env.DATABASE_URL || "file:./dev.db";

  // Use LibSQL adapter if Turso credentials or libsql:// protocol are detected
  if (tursoAuthToken || (tursoUrl && tursoUrl.startsWith("libsql://")) || databaseUrl.startsWith("libsql://")) {
    const url = tursoUrl || databaseUrl;
    const adapter = new PrismaLibSQL({
      url,
      authToken: tursoAuthToken,
    });
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
  }

  // Standard Prisma SQLite client for local development
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

