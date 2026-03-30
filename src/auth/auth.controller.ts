import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUsuarioDTO } from './dto/login-usuario.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@Post('login')
@HttpCode(200)
login(@Body() loginUsuario:LoginUsuarioDTO){
  return this.authService.login(loginUsuario);
}
}
