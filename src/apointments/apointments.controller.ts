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
    return await this.appointmentsService.getFreeHoursForDoctorByDate(dto);
  }

  @Get('/stats')
  getStats() {
    return this.appointmentsService.getStats();
  }

  @Get()
  async find(@Query() dto: any){
    return this.appointmentsService.find(dto)
  }
  
  @Get('/by-user')
  async getByUser(@Query() {role, userId}: any) {
    return this.appointmentsService.getVisitsByUser({role, userId})
  }
  
  @Patch(':id')
  async update(
    @Param() {id}: any,
    @Body() dto: any) {
    return this.appointmentsService.update(id,dto)
  }
}
