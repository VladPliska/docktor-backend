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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetUsersDto } from './dto/get-users.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-user')
  @UseGuards(AuthGuard)
  createUser(@Body() createUserDto: CreateUserDto, @Req() req) {
    return this.usersService.createUser(createUserDto, req.user);
  }

  @Patch(':userId/change-password/')
  async changePassword(
    @Body() dto: ChangePasswordDto,
    @Param('userId') userId: string,
  ) {
    return this.usersService.changePassword(userId, dto);
  }

  @Get()
  findAll(@Query() { role }: GetUsersDto) {
    return this.usersService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.usersService.remove(userId);
  }
}
