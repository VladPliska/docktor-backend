import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Get()
  async get() {
    return this.feedbacksService.findAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.feedbacksService.findOne(id);
  }

  @Post()
  async create(@Body() dto) {
    return this.feedbacksService.create(dto)
  }

  @Delete('/:id')
  async delete(@Param('id') id: any){
    return this.feedbacksService.delete(id)
  }
}
