import { Token } from './../shared/entities/token.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@shared/entities/user.entity';
import { TokenRepository } from '@shared/repositories/token.repository';
import { UserRepository } from '@shared/repositories/user.repository';
import { JWTAuthService } from '@shared/services/jwt-auth.service';
import { PasswordService } from '@shared/services/password.service';
import { LoginDto, RegisterDto } from './dto/index.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly jwtAuthService: JWTAuthService,
    private readonly tokenRepository: TokenRepository,
  ) {}
  async register(registereDto: RegisterDto): Promise<void> {
    const hashedPassword = await this.passwordService.hashPassword(
      registereDto.password,
    );

    await this.userRepository.create({
      ...registereDto,
      password: hashedPassword,
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      select: {},
      where: {
        email: loginDto.email,
      },
    });
    if (
      !user ||
      !(await this.passwordService.compareHash(
        loginDto.password,
        user.password,
      ))
    ) {
      throw new UnauthorizedException('WRONG_CREDENTIALS');
    }
    const token = await this.generateUserToken(user);
    await this.tokenRepository.delete({ userId: user.id });
    await this.tokenRepository.create({
      userId: user.id,
      token: token,
    });
    return { user, token };
  }

  private async generateUserToken(userD: Partial<User>): Promise<string> {
    const token = await this.jwtAuthService.generateToken({ ...userD });
    return token;
  }
}
