import 'dotenv/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });

    super({ adapter,
      omit: {
        user: {
          password: true
        }
      }
     });
  }

  async onModuleInit() {
    await this.$connect();
  }

  // Extend the client to globally exclude passwords from query results
  readonly extended = this.$extends({
    result: {
      user: {
        password: {
          needs: { password: true },
          compute() {
            return undefined; // Automatically strips the password out of queries
          },
        },
      },
    },
  });
}