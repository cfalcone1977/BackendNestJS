import { IsNumber, IsString, IsNotEmpty} from "class-validator";
import {Type} from "class-transformer";

export class LoginUsuarioDTO{
  @IsNotEmpty()
  @Type(()=>Number)
  @IsNumber()
  dni:number;   //dni_usuario
  @IsNotEmpty()
  @IsString()
  contraseña:string;

}