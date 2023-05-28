import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CryptoModule } from '../crypto/crypto.module';
import { MailModule } from '../mail/mail.module';
import { DoctorDetailsEntity } from './entities/doctor-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, DoctorDetailsEntity]), CryptoModule, MailModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
