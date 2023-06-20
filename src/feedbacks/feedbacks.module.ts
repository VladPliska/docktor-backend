import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackEntity } from './entities/feedback.entity';
import { AppointmentsEntity } from '../apointments/entities/apointment.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedbackEntity, AppointmentsEntity, User])],
  controllers: [FeedbacksController],
  providers: [FeedbacksService]
})
export class FeedbacksModule {}
