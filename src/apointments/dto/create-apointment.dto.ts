import { IsDateString, IsEmail, IsInt, IsString } from "class-validator";

export class CreateAppointmentDto {
  @IsString()
  doctorId: string;

  @IsString()
  date: string;

  @IsString()
  time: string;

  @IsString()
  description: string;

  @IsString()
  firstName: string;
  
  @IsString()
  lastName: string;

  @IsString()
  phoneNumber: string;
  
  @IsEmail()
  email: string;
}
