import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackEntity } from './entities/feedback.entity';
import { Repository } from 'typeorm';
import { AppointmentsEntity } from '../apointments/entities/apointment.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FeedbacksService {
  constructor(@InjectRepository(FeedbackEntity) private readonly repos: Repository<FeedbackEntity>,
              @InjectRepository(AppointmentsEntity) private appointmentRepos: Repository<AppointmentsEntity>,
              @InjectRepository(User) private userRepository: Repository<User>) {
  }

  async findAll() {
    const feedbacks = await this.repos.find();

    const mapped = await Promise.all(feedbacks.map(async f => {
      const client = await this.userRepository.findOne({where: {userId: f.userId}})

      return {client, ...f}
    }))

    return mapped
  }

  findOne(id) {
    return this.repos.find({where: {feedbackId: id}})
  }
  async create(dto) {
    const {visitId, feedback} = dto;
    const appointment = await this.appointmentRepos.findOne({where: {appointmentId: visitId}})

    const feedbackBody: Partial<FeedbackEntity> = {
      userId: appointment.clientId,
      text: feedback,
      appointmentId: visitId
    }
    return this.repos.save(feedbackBody)
  }

  async getByVisit(visitId) {
    return this.repos.findOne({where: { appointmentId: visitId}})
  }
}
