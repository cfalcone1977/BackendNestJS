import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService:JwtService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    //console.log(context);
    //console.log(context.switchToHttp().getRequest())
    const request=context.switchToHttp().getRequest();
    //console.log(request);
    const [type, token]= request.headers.authorization?.split(' ') || [];
    // [bearer, token generado]----> type y token
    console.log(type.toLowerCase());
    console.log(token);
    if (!(type.toLowerCase()==="bearer")) throw new UnauthorizedException("Tipo de Token Invalido");
    if (!token) throw new UnauthorizedException ("Token Inexistente");
    const datos_encriptados= await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET});
    console.log(datos_encriptados);
    request['usuario']=datos_encriptados; //asigno datos encriptados a request
    if (datos_encriptados) return true;
    throw new UnauthorizedException("Token no Autorizado");
  }
}
