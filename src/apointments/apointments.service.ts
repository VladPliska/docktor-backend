import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentsEntity } from './entities/apointment.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-apointment.dto';
import { GetAppointmentByDate } from './dto/get-appointment-by-date';
import * as moment from 'moment';
import { UsersService } from '../users/users.service';
import { UserRole } from 'src/users/entities/user.entity';
import { retry } from 'rxjs';
import * as request from 'supertest';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentsEntity)
    private readonly repository: Repository<AppointmentsEntity>,
    private readonly userService: UsersService,
  ) {}

  async getFreeHoursForDoctorByDate({ date, doctorId }: GetAppointmentByDate) {
    const hours = [];

    for (let i = 5; i <= 23; i++) {
      const hour = `${i.toString().padStart(2, '0')}:00`;
      hours.push(hour);
    }

    const appointments = await this.repository
      .createQueryBuilder('a')
      .where('a.doctorId = :doctorId', { doctorId })
      .andWhere(`DATE_TRUNC('day', CAST(a.date AS DATE)) = DATE_TRUNC('day', CAST(:date AS DATE))`, { date })
      .getMany();

    // TODO check timezone
    const busyHours = appointments.map(a => {
      const hour = moment(a.date).hours();
      return `${hour}:00`
    })
    
      
    return hours.filter((value) => !busyHours.includes(value));
  }

  async createAppointment(dto: CreateAppointmentDto) {
    const clientExist = await this.userService.findUserByPhone(dto.phoneNumber);
    
    let clientId = '' 
    if(!clientExist){
      const client = await this.userService.createUser({
        lastName: dto.lastName,
        firstName: dto.firstName,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        role: UserRole.patient
      })
      
      clientId = client.userId;
    }else {
      clientId = clientExist.userId
    }
    
    const doctor = await this.userService.findOne(dto.doctorId);
    
    if(!doctor || doctor.role !== UserRole.doctor){
      throw new HttpException('Лікаря не знайдено', 400);
    }
    
    const appointmentPayload = {
      clientId,
      date: dto.date,
      time: dto.time,
      description: dto.description,
      doctorId: doctor.userId,
    }
    
    return await this.repository.save(appointmentPayload);
  }
  
  async find() {
    const appointments = await this.repository.find();
    
    const mapAppointments = await Promise.all(appointments.map(async (a) => {
      const [client, doctor] = await Promise.all([
        this.userService.findOne(a.clientId),
        this.userService.findOne(a.doctorId)
      ])
      
      return {...a, client, doctor}
    }));
    
    return mapAppointments;
  }
    
}
