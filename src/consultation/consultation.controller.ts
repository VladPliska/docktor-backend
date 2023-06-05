import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';

@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  async create(@Body() dto: any) {
    return this.consultationService.create(dto);
  }
  
  @Get()
  async getAll() {
    return this.consultationService.findAll();
  }
  
  @Patch('/:id') 
  async update(@Param('id') id: string){
    return this.consultationService.update(id);;
  }
}
