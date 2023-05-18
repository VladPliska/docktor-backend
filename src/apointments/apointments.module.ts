import { Module } from '@nestjs/common';
import { ApointmentsService } from './apointments.service';
import { ApointmentsController } from './apointments.controller';

@Module({
  controllers: [ApointmentsController],
  providers: [ApointmentsService]
})
export class ApointmentsModule {}
