import { IsNumber, IsString } from "class-validator";

export class CreateServiceDto {
  @IsString()
  name: string;
  
  @IsString()
  description: string;

  @IsNumber()
  price: number;
}
