import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessClass } from '@shared/classes/success.class';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/index.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async registerPhone(@Body() registerDto: RegisterDto): Promise<SuccessClass> {
    await this.authService.register(registerDto);
    return new SuccessClass();
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<SuccessClass> {
    const data = await this.authService.login(loginDto);
    return new SuccessClass(data);
  }
}
