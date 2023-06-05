import { Injectable } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Consultation, ConsultationStatus } from './entities/consultation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConsultationService {
  constructor(@InjectRepository(Consultation) private readonly repos: Repository<Consultation>) {}
  
  create(dto: any) {
    // TODO: send email message
    return this.repos.save(dto);
  }

  findAll() {
    return this.repos.find();
  }

  update(id: string) {
    return this.repos.update(id, {status: ConsultationStatus.processed})
  }
}
