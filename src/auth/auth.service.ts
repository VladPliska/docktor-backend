import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async signIn({ email, pass }: CreateAuthDto): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    const isPasswordValid = await this.cryptoService.comparePasswordAndHash(
      pass,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ForbiddenException('Користувача не знайдено');
    }

    const { password, ...result } = user;

    return { accessToken: await this.jwtService.signAsync(result) };
  }

  async activateUser(userId: string) {
    const user = await this.usersService.findOne(userId);

    if (user.verification) return;

    await this.usersService.update(userId, { verification: true });
  }
}
