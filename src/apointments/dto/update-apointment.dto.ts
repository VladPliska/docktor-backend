import { PartialType } from '@nestjs/mapped-types';
import { CreateApointmentDto } from './create-apointment.dto';

export class UpdateApointmentDto extends PartialType(CreateApointmentDto) {}
