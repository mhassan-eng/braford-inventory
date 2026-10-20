import { PrismaClient } from '@prisma/client';

export type DbClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$use' | '$extends'
>;