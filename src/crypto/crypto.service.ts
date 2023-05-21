import * as bcrypt from 'bcrypt';
import { SALT } from '../constants';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  async comparePasswordAndHash(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  async createHash(phrase: string) {
    return await bcrypt.hash(phrase, SALT);
  }
}
