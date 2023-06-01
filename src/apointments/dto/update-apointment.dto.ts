import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-apointment.dto';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {}
