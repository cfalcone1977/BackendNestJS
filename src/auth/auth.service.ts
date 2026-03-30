import { UnauthorizedException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUsuarioDTO } from './dto/login-usuario.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ResponseDTO } from 'src/usuarios/dto/usuario.response.dto';
import { ResponseLoginDTO } from './dto/login-response.dto';
import * as bcrypt from 'bcrypt';
import { Usuario } from 'src/usuarios/usuario.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async login(loginUsuario: LoginUsuarioDTO): Promise<ResponseLoginDTO> {
    //Promise<ResponseDTO>
    const { dni, contraseña } = loginUsuario;
    const usuarioLogeado = await this.usuariosService.getUsuarioDBxDNI(dni);
    console.log(usuarioLogeado);
    if (!usuarioLogeado)
      throw new UnauthorizedException('Usuario NO AUTENTICADO');
    else {
      console.log(usuarioLogeado);
      const matchean: boolean = await bcrypt.compare(
        contraseña,
        usuarioLogeado.contraseña,
      );
      if (matchean) {
        const datosLlave = {
          //payload
          dni: usuarioLogeado.dni_usuario,
          mail: usuarioLogeado.mail,
        };
        const datos_encriptados = await this.jwtService.signAsync(datosLlave, {
          secret: process.env.JWT_SECRET,
        });
        return {
          code: HttpStatus.OK,
          message: 'Usuario AUTENTICADO',
          token: datos_encriptados,
        };
      } else throw new UnauthorizedException('Contraseña INVALIDA');
    }
  }
}
