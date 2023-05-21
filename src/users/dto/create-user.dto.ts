import { IsDefined, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @IsDefined({ message: 'Email обовзякове поле' })
  @IsEmail({}, { message: 'Email повинен відповідати формату mail@mail.com' })
  email: string;

  @IsString()
  @IsDefined({ message: 'Імя обовзякове поле' })
  @Length(3, 20)
  firstName: string;

  @IsString()
  @IsDefined({ message: 'Прізвище обовзякове поле' })
  @Length(3, 20)
  lastName: string;

  @IsString()
  @IsEnum(UserRole)
  role: string;

  @IsOptional()
  @IsPhoneNumber('UA', {
    message: 'Номер телефону повинен відповідати формату 380ХХХХХХХХХ',
  })
  phoneNumber: string;
}
