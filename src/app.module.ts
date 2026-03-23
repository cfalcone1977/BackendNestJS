import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Usuario } from './usuarios/usuario.entity';
import { ProvinciaModule } from './provincia/provincia.module';
@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot({
    type:'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
   /* host: 'localhost',
    port: 3306,
    username:'root',
    password:'root',
    database:'LIBERTYFINANCE',*/
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false
  }), UsuariosModule, ProvinciaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
