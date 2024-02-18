import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Token } from '@shared/entities/token.entity';
import { TokenRepository } from '@shared/repositories/token.repository';
import { UserRepository } from '@shared/repositories/user.repository';
import { JWTAuthService } from '@shared/services/jwt-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtAuthService: JWTAuthService,
    private readonly tokenRepository: TokenRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization) {
      throw new UnauthorizedException({ message: 'UNAUTHENTICATED' });
    }

    if (!request.headers.authorization.startsWith('Bearer')) {
      throw new UnauthorizedException({ message: 'UNAUTHENTICATED' });
    }

    try {
      const token: string = request.headers.authorization.slice(7);

      const result = await this.jwtAuthService.verifyToken(token);
      const userAccessToken: Partial<Token> =
        await this.tokenRepository.findOne({
          where: { token },
          select: {
            userId: true,
            token: true,
          },
        });

      if (!userAccessToken) {
        throw new UnauthorizedException({ message: 'UNAUTHENTICATED' });
      }

      const user = await this.userRepository.findOne({
        where: { id: userAccessToken.userId },
        select: { id: true },
      });

      if (!user) {
        throw new UnauthorizedException({ message: 'UNAUTHENTICATED' });
      }

      request.user = result;
      return true;
    } catch (err) {
      if (err.message === 'jwt expired') {
        throw new UnauthorizedException({ message: 'TOKEN_EXPIRED_ERROR' });
      }
      throw new UnauthorizedException({ message: 'UNAUTHENTICATED' });
    }
  }
}
