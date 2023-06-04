import { IsArray, IsDateString, IsEmail, IsInt, IsString } from "class-validator";
import { Service } from "src/services/entities/service.entity";

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
  
  @IsArray()
  services: Service[]
}
