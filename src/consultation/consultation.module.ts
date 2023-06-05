import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consultation } from './entities/consultation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consultation])],
  controllers: [ConsultationController],
  providers: [ConsultationService]
})
export class ConsultationModule {}
