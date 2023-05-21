import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { CryptoService } from '../crypto/crypto.service';
import { MailService } from '../mail/mail.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly cryptoService: CryptoService,
    private readonly mailService: MailService,
  ) {}

  async createUser(dto: CreateUserDto, user: any) {
    if (
      user.role === UserRole.doctor &&
      (dto.role === UserRole.doctor || dto.role === UserRole.admin)
    ) {
      throw new HttpException('Лікар може додати тільки користувача', 400);
    }

    const generatedPassword = 1111; //Math.floor(Math.random() * 10000);
    const hashPassword = await this.cryptoService.createHash(
      generatedPassword.toString(),
    );

    const userObj = this.userRepository.create({
      ...dto,
      password: hashPassword,
    });

    // TODO  problem with compilation
    // await this.mailService.sendUserConfirmation({
    //   email: dto.email,
    //   password: generatedPassword,
    //   name: dto.firstName + ' ' + dto.lastName,
    // });

    await this.userRepository.save(userObj);
    return dto;
  }

  async findAll(role: string) {
    return await this.userRepository.find({
      where: {
        role,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { userId: id } });

    const {
      lastName,
      firstName,
      avatar,
      email,
      userId,
      phoneNumber,
      verification,
    } = user;

    return {
      lastName,
      firstName,
      avatar,
      email,
      userId,
      phoneNumber,
      verification,
    };
  }

  async update(userId: string, dto: UpdateUserDto) {
    await this.userRepository.update({ userId }, { ...dto });
  }

  async remove(userId: string) {
    return this.userRepository.delete(userId);
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async changePassword(
    userId: string,
    { password, oldPassword }: ChangePasswordDto,
  ) {
    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundError('Користувач не знайдений');
    }

    const isOldPasswordValid = await this.cryptoService.comparePasswordAndHash(
      oldPassword,
      user.password,
    );

    if (!isOldPasswordValid) {
      throw new BadRequestException('Старий пароль не вірний');
    }

    user.password = await this.cryptoService.createHash(password);
    user.verification = true;

    await this.userRepository.save(user);
  }
}
