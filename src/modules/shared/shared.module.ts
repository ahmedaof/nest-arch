import { dataSourceOptions } from '../../../db/database.config';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostRepository } from './repositories/post.repository';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { JWTAuthService } from './services/jwt-auth.service';
import { PasswordService } from './services/password.service';
import { TokenRepository } from './repositories/token.repository';
import { Token } from './entities/token.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        const expiresIn = configService.get<string>('JWT_EXPIRE_IN');
        console.log('JWT Secret:', jwtSecret);
        console.log('JWT Expire In:', expiresIn);
        return {
          secret: jwtSecret,
          signOptions: { expiresIn },
        };
      },
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([]),
    TypeOrmModule.forFeature([Post, User, Token]),
  ],
  exports: [
    PostRepository,
    UserRepository,
    JWTAuthService,
    PasswordService,
    TokenRepository,
  ],
  providers: [
    PostRepository,
    UserRepository,
    JWTAuthService,
    JwtService,
    PasswordService,
    TokenRepository,
  ],
})
export class SharedModule {}
