import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientApiController } from './client-api.controller';
import { ClientApiService } from './client-api.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ClientConfigModule } from './config/client-config.module';
import { UpdaterModule } from './updater/updater.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { CoursesModule } from './courses/courses.module';
import { AttendanceModule } from './attendance/attendance.module';
import { TimetableModule } from './timetable/timetable.module';

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
        host: configService.get<string>('CLIENT_DB_HOST'),
        port: configService.get<number>('CLIENT_DB_PORT'),
        username: configService.get<string>('CLIENT_DB_USER'),
        password: configService.get<string>('CLIENT_DB_PASS'),
        database: configService.get<string>('CLIENT_DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // Auto create tables for dev
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    ClientConfigModule,
    UpdaterModule,
    StudentsModule,
    TeachersModule,
    CoursesModule,
    AttendanceModule,
    TimetableModule,
  ],
  controllers: [ClientApiController],
  providers: [ClientApiService],
})
export class ClientApiModule {}
