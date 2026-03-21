import {IsString, IsOptional, IsEmail, IsNumber} from "class-validator";

export class UsuarioDto {
  @IsNumber()
  dni_usuario:number
  @IsString()
  nombre:string
  @IsString()  
  apellido:string
  @IsEmail()
  mail:string
  @IsString() 
  contraseña:string
  @IsString()
  numero_telefono:string
  @IsString()  
  direccion: string
  @IsNumber()
  id_perfilinv:number
  @IsNumber()
  id_codigo_referidos:number
  @IsNumber()
  id_rol:number
}

export class ModificarUsuarioDto{
  @IsNumber()
  @IsOptional()
  dni_usuario:number
  @IsString()
  @IsOptional()
  nombre:string
  @IsString()
  @IsOptional()  
  apellido:string
  @IsEmail()
  @IsOptional()
  mail:string
  @IsString()
  @IsOptional() 
  contraseña?:string
  @IsString()
  @IsOptional()
  numero_telefono:string
  @IsString()
  @IsOptional()  
  direccion: string
  @IsNumber()
  @IsOptional()
  id_perfilinv:number
  @IsNumber()
  @IsOptional()
  id_codigo_referidos:number
  @IsNumber()
  @IsOptional()
  id_rol:number
}
