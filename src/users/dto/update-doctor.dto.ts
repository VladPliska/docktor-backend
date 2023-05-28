import { PartialType } from "@nestjs/mapped-types";
import { CreateDoctor } from "./add-doctor-details.dto";

export class UpdateDoctorDto extends PartialType(CreateDoctor){}
