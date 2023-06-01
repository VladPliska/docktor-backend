import { IsDateString, IsString } from "class-validator";

export class GetAppointmentByDate {
  @IsString()
  date: string;
  
  @IsString()
  doctorId: string
}
