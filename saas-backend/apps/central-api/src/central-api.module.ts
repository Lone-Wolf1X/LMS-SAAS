import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentralApiController } from './central-api.controller';
import { CentralApiService } from './central-api.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LicensesModule } from './licenses/licenses.module';
import { PatchesModule } from './patches/patches.module';
import { CustomersModule } from './customers/customers.module';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('CENTRAL_DB_HOST'),
        port: configService.get<number>('CENTRAL_DB_PORT'),
        username: configService.get<string>('CENTRAL_DB_USER'),
        password: configService.get<string>('CENTRAL_DB_PASS'),
        database: configService.get<string>('CENTRAL_DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // Auto create tables for dev
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    LicensesModule,
    PatchesModule,
    CustomersModule,
    InvoicesModule,
  ],
  controllers: [CentralApiController],
  providers: [CentralApiService],
})
export class CentralApiModule {}
