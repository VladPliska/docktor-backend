import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDefined, IsOptional, IsPhoneNumber, IsString, Length, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  verification?: boolean;
  @IsString()
  @IsDefined({ message: 'Імя обовзякове поле' })
  @Length(3, 20)
  firstName?: string;

  @IsString()
  @IsDefined({ message: 'Прізвище обовзякове поле' })
  @Length(3, 20)
  lastName?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsPhoneNumber('UA', {message: 'Невірий формат номеру телефона'})
  phoneNumber?: string
}
