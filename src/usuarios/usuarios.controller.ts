import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards, SetMetadata } from '@nestjs/common';
import {UsuariosService} from "./usuarios.service";
import {type Response} from 'express';
import { ModificarUsuarioDto, UsuarioDto } from './dto/usuario.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/auth.roles';
//import { LoginUsuarioDTO } from '../auth/dto/login-usuario.dto';

export const Roles = (...roles: number[]) => SetMetadata('roles', roles);


@Controller('usuarios')
@UseGuards(AuthGuard, RolesGuard)
export class UsuariosController {
  constructor(private usuariosService: UsuariosService){}

  /*
@Post('login')
@HttpCode(200)
login(@Body() loginUsuario:LoginUsuarioDTO){
  return this.usuariosService.login(loginUsuario);
}*/

//@UseGuards(AuthGuard)
@Get()    
@Roles(1)
listarUsuarios(){
    return this.usuariosService.getAllUsuariosDB();
}

@Get('buscarxNombre')
buscarUsuarioxNombre(@Query('nombre')nombre:string){
    return this.usuariosService.buscarUsuarioxNombre(nombre);
}

@Get(':identificador')    
buscarUsuarioxID(@Param('identificador') identificador:number){
    return this.usuariosService.getUsuarioDBxID(identificador);
}

@Post()
crearNuevoUsuario(@Body() nuevoUsuario:UsuarioDto){
    return this.usuariosService.crearUsuario(nuevoUsuario);
}
@Delete(':identificador')
eliminarUsuario(@Param('identificador')identificador:number){
    return this.usuariosService.eliminarUsuario(identificador);
}

@Patch(':identificador')
modificarUsuario(@Param('identificador')identificador:number, @Body() modificaciones:ModificarUsuarioDto){
    return this.usuariosService.modificarUsuario(identificador,modificaciones);
}
}




/*
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {UsuariosService} from "./usuarios.service";
import {UsuarioDto, ModificarUsuarioDto} from "./dto/usuario.dto";

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService){}

@Get()    
listarUsuarios(){
    return this.usuariosService.getAllUsuarios();
}
@Post()
crearUsuario(@Body() datosUsuario:UsuarioDto){
    return this.usuariosService.crearUsuarios(datosUsuario.nombre,datosUsuario.contraseña,datosUsuario.email);
}
@Delete(':identificador')
eliminarUsuario(@Param('identificador') identificador:string){
   return this.usuariosService.eliminarUsuario(identificador);
}
@Patch(':identificador')
modificarUsuario(@Param('identificador') identificador:string, @Body() usuarioModificado:ModificarUsuarioDto){
   return this.usuariosService.modificarUsuario(identificador,usuarioModificado.nombre,usuarioModificado.contraseña,usuarioModificado.email);
}

}
*/