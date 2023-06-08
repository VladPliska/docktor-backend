import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetUsersDto } from './dto/get-users.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateDoctor } from './dto/add-doctor-details.dto';
import { OnlyAdminGuard } from './guards/only-admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-user')
  @UseGuards(AuthGuard)
  createUser(@Body() createUserDto: CreateUserDto, @Req() req) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('add-doctor')
  @UseGuards(AuthGuard)
  createDoctor(@Body() dto: CreateDoctor, @Req() req) {
    return this.usersService.createDoctor(dto, req.user);
  }

  @Patch(':userId/change-password/')
  async changePassword(
    @Body() dto: ChangePasswordDto,
    @Param('userId') userId: string,
  ) {
    return this.usersService.changePassword(userId, dto);
  }

  @Patch('/doctor/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async updateDoctor(
    @Body() dto: any,
    @Req() req,
    @Param('userId') userId: string,
  ) {
    return await this.usersService.updateDoctor(dto, req.user, userId);
  }

  @Get('find-by-email')
  async findUserByEmail(
    @Query('email') email: string,
    @Query('id') id: string,
  ) {
    return await this.usersService.getUserByEmail(email, id);
  }

  @Get()
  findAll(@Query() { role, search }: GetUsersDto) {
    return this.usersService.findAll(role, search);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('/get-by-phone/:phone')
  findUserByPhone(@Param('phone') phone: string) {
    return this.usersService.findUserByPhone(phone)
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  @UseGuards(AuthGuard, OnlyAdminGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('userId') userId: string) {
    return this.usersService.deactivateUser(userId);
  }

  @Post('send-verification-code')
  async sendVerificationCode(@Body() dto: any){
    return await this.usersService.sendVerificationCode(dto.email)
  }
}

