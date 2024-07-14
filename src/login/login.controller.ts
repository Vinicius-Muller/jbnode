import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';

@Controller('auth')
export class LoginController {
  constructor(private authService: LoginService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: CreateLoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
