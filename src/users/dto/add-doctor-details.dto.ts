import { IsNumber, IsNumberString, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateDoctor extends CreateUserDto {
  @IsNumberString()
  price: number;

  @IsString()
  description: string;
  
  @IsString()
  diploma: string;
  
  @IsString()
  doctorType: string;
  
  @IsString()
  schedule: string;
  
  @IsString()
  credo: string;
}
