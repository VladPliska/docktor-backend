import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentsEntity } from './entities/apointment.entity';
import { Repository, Between, In } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-apointment.dto';
import { GetAppointmentByDate } from './dto/get-appointment-by-date';
import * as moment from 'moment';
import { UsersService } from '../users/users.service';
import { UserRole } from 'src/users/entities/user.entity';
import { Service } from 'src/services/entities/service.entity';
import { log } from 'console';


@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentsEntity)
    private readonly repository: Repository<AppointmentsEntity>,
    private readonly userService: UsersService,
    @InjectRepository(Service) private readonly serviceRep: Repository<Service>,
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
    
    const services = await this.serviceRep.find({where: {id: In(dto.services)}})
    
    const appointmentPayload = {
      clientId,
      date: dto.date,
      time: dto.time,
      description: dto.description,
      doctorId: doctor.userId,
      services
    }
    
    return await this.repository.save(appointmentPayload);
  }
  
  async find(options: any) {
    const filterObject = {};
    
    if(options.today) {
      const today = moment().format('DD-MM-YYYY');
      filterObject['date'] = today;
    }
    
    if(options.doctorId){
      filterObject['doctorId'] = options.doctorId;
    }
    
    if(options.startDate){
      filterObject['date'] = Between(options.startDate, options.endDate)
    }
    
    if(options.userName) {
      console.log(options)
      const users = await this.userService.findAll(UserRole.patient, options.userName);
      
      const clientIds = users.map(u => u.userId);
      filterObject['clientId'] = In(clientIds)
    }
    
    const appointments = await this.repository.find({where: filterObject, order: {date: 'DESC', time: 'DESC'}});
    
    const mapAppointments = await Promise.all(appointments.map(async (a) => {
      const [client, doctor] = await Promise.all([
        this.userService.findOne(a.clientId),
        this.userService.findOne(a.doctorId)
      ])
      
      return {...a, client, doctor}
    }));
    
    return this.sortByDate(mapAppointments);
  }
  
  async getToday() {
    const today = moment().format('dd-MM-YYYY');
    
    return this.repository.find({
      where: {
        date: today
      }
    })
  }
  
  async getVisitsByUser ({role, userId}: any) {
    const filter = {};
    
    if(role === UserRole.doctor) {
      filter['doctorId'] = userId
    }else {
      filter['clientId'] = userId; 
    }
    
    const visits = await this.repository.find({
      where: filter,
      order: { date: 'DESC', time: 'DESC' },
    });
    
    const mappedVisit = await Promise.all(visits.map(async (v) => {
      const [client, doctor] = await Promise.all([
        this.userService.findOne(v.clientId),
        this.userService.findOne(v.doctorId),
      ]);
      
      return {...v, client, doctor};
    }))
    
    return mappedVisit;
  }
    
  
  sortByDate(obj) {
    return obj.sort((a, b) => {
      const dateA = new Date(a.date + ' ' + a.time);
      const dateB = new Date(b.date + ' ' + b.time);

      if (dateA > dateB) {
        return -1; // a should come before b
      } else if (dateA < dateB) {
        return 1; // a should come after b
      } else {
        return 0; // a and b are equal
      }
    });
  }
  
  async update(id: string,dto) {
    try{
      const {services: serviceId, ...payload} =dto;
      const services = await this.serviceRep.find({
        where: { id: In(serviceId) },
      });
  
    const visit = await this.repository.findOne({where: {appointmentId: id}});
    visit.services = services;
    
    await Promise.all([
      this.repository.save(visit),
      this.repository.update({appointmentId: id}, { ...payload })
      ])
    }catch(err) {
      throw err;
    }

  }
}
