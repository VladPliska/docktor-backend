import { Injectable } from '@nestjs/common';
import { CreateApointmentDto } from './dto/create-apointment.dto';
import { UpdateApointmentDto } from './dto/update-apointment.dto';

@Injectable()
export class ApointmentsService {
  create(createApointmentDto: CreateApointmentDto) {
    return 'This action adds a new apointment';
  }

  findAll() {
    return `This action returns all apointments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apointment`;
  }

  update(id: number, updateApointmentDto: UpdateApointmentDto) {
    return `This action updates a #${id} apointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} apointment`;
  }
}
