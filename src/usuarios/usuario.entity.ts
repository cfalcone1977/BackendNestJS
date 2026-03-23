import { Provincia } from "src/provincia/entities/provincia.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuarios")
export class Usuario{

  @PrimaryGeneratedColumn()
  id:number
  @Column()
  dni_usuario: number
  @Column()  
  nombre:string
  @Column()  
  apellido:string
  @Column()
  mail:string
  @Column()
  contraseña:string
  @Column() 
  numero_telefono:string
  @Column()
  direccion: string
  @Column()
  id_perfilinv:number
  @Column() 
  id_codigo_referidos:number
  @Column() 
  id_rol:number
  @ManyToOne(()=>Provincia)
  @JoinColumn()
  provincia:Provincia

/*  
constructor(dni_usuario:number,nombre:string, apellido:string,
  mail:string,contraseña:string,numero_telefono:string,direccion:string, id_perfilinv:number,
  id_codigo_referidos:number, id_rol:number){
    this.dni_usuario=dni_usuario
    this.nombre=nombre
    this.apellido=apellido
    this.mail=mail
    this.contraseña=contraseña
    this.numero_telefono=numero_telefono
    this.direccion=direccion
    this.id_perfilinv=id_perfilinv
    this.id_codigo_referidos=id_codigo_referidos
    this.id_rol=id_rol
}*/

}

