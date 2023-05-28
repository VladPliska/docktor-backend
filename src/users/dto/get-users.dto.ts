import { IsEnum, IsOptional, IsString } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class GetUsersDto {
  @IsEnum(UserRole)
  role: string;
  
  @IsOptional()
  @IsString()
  search?: string;
}
