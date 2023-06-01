import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppointmentsService } from './apointments.service';
import { CreateAppointmentDto } from './dto/create-apointment.dto';
import { GetAppointmentByDate } from './dto/get-appointment-by-date';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(dto);
  }

  @Get('/free-hours')
  async getFreeHours(
    @Query() dto: GetAppointmentByDate,
  ) {
    return this.appointmentsService.getFreeHoursForDoctorByDate(dto);
  }
  
  @Get()
  async find(){
    return this.appointmentsService.find()
  }
}
