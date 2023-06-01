import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { retry } from 'rxjs';
import { UserRole } from '../entities/user.entity';

@Injectable()
export class OnlyAdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
  
    const user = request.user;
    
    if(user.role !== UserRole.admin) {
      throw new ForbiddenException('Тільки адміністратор може виконувати цю дію')
    }
    

   return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
