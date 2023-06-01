import { Module } from '@nestjs/common';
import { AppointmentsService } from './apointments.service';
import { AppointmentsController } from './apointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsEntity } from './entities/apointment.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentsEntity]), UsersModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService]
})
export class AppointmentsModule {}
