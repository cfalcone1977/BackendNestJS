import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { Provincia } from './entities/provincia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { ResponseDTO } from './dto/provincia.response.dto';

@Injectable()
export class ProvinciaService {

   constructor(@InjectRepository(Provincia) private readonly provinciaRepository: Repository<Provincia>){}

  create(createProvinciaDto: CreateProvinciaDto) {
    return 'This action adds a new provincia';
  }

 async traerProvincias():Promise<ResponseDTO> {
    const provincias=await this.provinciaRepository.find();
    if (!provincias.length) throw console.log("Problema al acceder a los datos");    
    return {
           code: HttpStatus.OK,
           message: 'Lectura de Provincias Exitosa',
           data: provincias
           };
  }
  
/*
async getAllUsuariosDB():Promise<ResponseDTO>{
       const usuarios= await this.usuarioRepository.find({
        relations: ['provincia']
       });
       if (!usuarios.length) throw new NotFoundException("NO existen USUARIOS");
       return {                       
              code:HttpStatus.OK,
              message: 'Lectura de Usuarios Exitosa',
              data: usuarios
       }
}*/
  /*
  findOne(id: number) {
    return `This action returns a #${id} provincia`;
  }

  update(id: number, updateProvinciaDto: UpdateProvinciaDto) {
    return `This action updates a #${id} provincia`;
  }

  remove(id: number) {
    return `This action removes a #${id} provincia`;
  }*/
}
