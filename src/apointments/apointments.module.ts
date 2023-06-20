import { Module } from '@nestjs/common';
import { AppointmentsService } from './apointments.service';
import { AppointmentsController } from './apointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsEntity } from './entities/apointment.entity';
import { UsersModule } from 'src/users/users.module';
import { ServicesModule } from 'src/services/services.module';
import { FeedbacksModule } from '../feedbacks/feedbacks.module';
import { FeedbacksService } from '../feedbacks/feedbacks.service';
import { FeedbackEntity } from '../feedbacks/entities/feedback.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentsEntity, FeedbackEntity, User]), UsersModule, ServicesModule, FeedbacksModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, FeedbacksService]
})
export class AppointmentsModule {}
