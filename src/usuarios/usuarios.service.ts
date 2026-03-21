import { HttpStatus, Injectable, NotFoundException, InternalServerErrorException, HttpException } from '@nestjs/common';
import {Usuario} from "./usuario.entity";
import { ResponseDTO } from './dto/usuario.response.dto';
import {v4} from "uuid";
import { UsuarioDto, ModificarUsuarioDto } from './dto/usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';


@Injectable()
 
export class UsuariosService {
  constructor(@InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>){}


async getAllUsuariosDB():Promise<ResponseDTO>{
       const usuarios= await this.usuarioRepository.find();
       if (!usuarios.length) throw new NotFoundException("NO existen USUARIOS");
       return {                       
              code:HttpStatus.OK,
              message: 'Lectura de Usuarios Exitosa',
              data: usuarios
       }
}

async getUsuarioDBxID(id:number):Promise<ResponseDTO>{     

       const usuario= await this.usuarioRepository.findOneBy( {id} );
                                                       //findOneBy({id});
                                                       //query(`SELECT * FROM usuarios Where id=${id}`)
       if (!usuario) throw new NotFoundException("NO existe USUARIO");  
    
       return {                       
              code:HttpStatus.OK,
              message: 'Lectura de Usuario Exitosa',
              data: usuario
       }
          
}

async crearUsuario(usuario:UsuarioDto):Promise<ResponseDTO>{
   const nuevoUsuario= this.usuarioRepository.create(usuario);
   const res=await this.usuarioRepository.save(usuario);
   console.log(`Usuario: ${res.nombre} ${res.apellido} con ID: ${res.id} RESGISTRADO!`);
   return { 
     code: HttpStatus.CREATED,
     message: 'Usuario Creado Exitosamente!',
     data: res
   }

}

async eliminarUsuario(id:number):Promise<ResponseDTO>{
    const res = await this.usuarioRepository.delete({id})
    console.log(res)
    if (!res.affected) throw new NotFoundException('Usuario o Id no existente!');
    return {
             code: HttpStatus.OK,
             message: `Usuario con ID: ${id} Eliminado Correctamente`
    }
  
}
async modificarUsuario(id:number, modificaciones:ModificarUsuarioDto):Promise<ResponseDTO>{
   const res= await this.usuarioRepository.update(id, modificaciones);
   if (!res.affected) throw new NotFoundException(`ID:${id} o Usuario inexistente!!, NO SE ACTUALIZO usuario`);
   return {
            code: HttpStatus.CREATED,
            message: `Usuario ${id} ACTUALIZADO!`
          }
}
 
async buscarUsuarioxNombre(nombreBuscar:string):Promise<ResponseDTO>{
    const res= await this.usuarioRepository.find({
        where:{
          nombre: Like(`%${nombreBuscar}%`)
              }
        })
    if (!res.length) throw new NotFoundException('Criterio de Busqueda INEXISTENTE!');
    console.log(`Se encontraron ${res.length} registros para esta Busqueda`)
    return {
            code: HttpStatus.OK,
            message: 'Busqueda Exitosa!',
            data: res
    }
}

}


/*
export class UsuariosService {
     //Simulo base de DATOS
    private usuarios: Usuario[]=[{id:"AX001",
        nombre:"cristian",
        contraseña:"1234",
        email:"cristianfalcone@hotmail.com"
        }]


getAllUsuarios(){
    console.log("Se ha listado usuarios...",this.usuarios.length);
    return this.usuarios;
}

crearUsuarios(nombre:string,contraseña:string,email:string){
    const id=v4();
    const nuevoUsuario={id,nombre,contraseña,email};
    this.usuarios.push(nuevoUsuario);
    console.log("Se ha creado el usuario:",nuevoUsuario);
    return  `Usuario ${nombre} ha sido creado!`;
}

eliminarUsuario(id:string){
    this.usuarios=this.usuarios.filter(usuario=>usuario.id !==id);
    return `Usuario ${id} ha sido eliminado!`;
}
buscarUsuario(id:string):number{
  let posicion:number=-1;
  for (let i = 0; i < this.usuarios.length; i=i+1) {
    if (this.usuarios[i].id===id){
                             posicion=i;
                                 }
  }
  return posicion;
}

modificarUsuario(id:string,nombre?:string,contraseña?:string,email?:string):string{
    const posicion:number=this.buscarUsuario(id);
    if (posicion!=-1){
        nombre? this.usuarios[posicion].nombre=nombre:null;
        contraseña? this.usuarios[posicion].contraseña=contraseña:null;
        email? this.usuarios[posicion].email=email:null;
    } else {
            console.log("El ID NO EXISTE!");
            return `El ID: ${id} no existe!`;
           }
    return `El usuario de modifico exitosamente!`;
}

}
*/
