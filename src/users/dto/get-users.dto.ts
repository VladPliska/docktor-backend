import { IsEnum } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class GetUsersDto {
  @IsEnum(UserRole)
  role: string;
}