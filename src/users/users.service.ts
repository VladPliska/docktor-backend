import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Status, User, UserRole } from './entities/user.entity';
import { CryptoService } from '../crypto/crypto.service';
import { MailService } from '../mail/mail.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { NotFoundError, find } from 'rxjs';
import { CreateDoctor } from './dto/add-doctor-details.dto';
import { DoctorDetailsEntity } from './entities/doctor-details.entity';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(DoctorDetailsEntity)
    private readonly doctorDetailsRepository: Repository<DoctorDetailsEntity>,
    private readonly cryptoService: CryptoService,
    private readonly mailService: MailService,
  ) {}

  async createUser(dto: CreateUserDto) {
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
    return await this.userRepository.save(userObj);;
  }

  async findAll(role: string, search) {
    let findObject = {
      role,
      status: Status.active,
    } as any;

    if (search) {      
      findObject = [
        {
          ...findObject,
          firstName: ILike(`%${search}%`),
        },
        {
          ...findObject,
          lastName: ILike(`%${search}%`),
        },
      ];
    }

    const users = await this.userRepository.find({
      where: findObject,
      relations: ['doctorDetails'],
    });

    return users.map((u) => {
      const { password, verification, verificationCode, ...data } = u;
      return data;
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { userId: id }, relations: ['doctorDetails'] });

    const {
      lastName,
      firstName,
      avatar,
      email,
      userId,
      phoneNumber,
      verification,
      role,
      doctorDetails
    } = user;

    return {
      lastName,
      firstName,
      avatar,
      email,
      userId,
      phoneNumber,
      verification,
      role,
      doctorDetails,
    };
  }

  async update(userId: string, dto: UpdateUserDto) {
    await this.userRepository.update({ userId }, { ...dto });
  }

  async remove(userId: string) {
    return this.userRepository.delete(userId);
  }

  getUserByEmail(email: string, id?: string) {
    const findObject = {
      email,
    };

    if (id) {
      findObject['userId'] = id;
    }

    return this.userRepository.findOne({
      where: findObject,
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

  async createDoctor(dto: CreateDoctor, user: any): Promise<void> {
    // if (user.role === UserRole.doctor && dto.role === UserRole.doctor) {
    //   throw new HttpException('Лікар не може додати лікара', 400);
    // }

    const generatedPassword = 1111; //Math.floor(Math.random() * 10000);
    const hashPassword = await this.cryptoService.createHash(
      generatedPassword.toString(),
    );

    const { price, schedule, credo, description, diploma, doctorType } = dto;
    let userObj = this.userRepository.create({
      ...dto,
      password: hashPassword,
      doctorDetails: {
        price,
        description,
        credo,
        schedule,
        diploma,
        doctorType,
      },
    });

    // TODO  problem with compilation
    // await this.mailService.sendUserConfirmation({
    //   email: dto.email,
    //   password: generatedPassword,
    //   name: dto.firstName + ' ' + dto.lastName,
    // });

    await this.userRepository.save(userObj);
  }

  async updateDoctor(dto: UpdateDoctorDto, user: any, userId: string) {
    try {
      if (user.role !== UserRole.admin) {
        throw new ForbiddenException('Користувач не має права');
      }

      const doctor = await this.userRepository.findOne({
        where: { userId },
        relations: ['doctorDetails'],
      });

      const {
        credo,
        description,
        diploma,
        doctorType,
        schedule,
        price,
        role,
        ...data
      } = dto;

      const details = {
        credo,
        description,
        diploma,
        doctorType,
        schedule,
        price,
      };

      await this.doctorDetailsRepository.update(doctor.doctorDetails, details);

      await this.userRepository.update({ userId }, { ...data });
    } catch (err) {
      throw err;
    }
  }

  async deactivateUser(userId: string) {
    return await this.userRepository.update(userId, { status: Status.deleted });
  }

  async findUserByPhone(phone: string) {
    return await this.userRepository.findOne({
      select: ['userId','email', 'firstName', 'lastName'],
      where: { phoneNumber: phone, status: Status.active, role: UserRole.patient },
    });
  }

  async sendVerificationCode(email){
    try {
    const code = Math.floor(Math.random() * 10000);

    await this.mailService.sendVerificationCode({email, code});
    await this.userRepository.update({email}, {verificationCode: code});
    }catch (err) {
      throw err;
    }
  }
}
