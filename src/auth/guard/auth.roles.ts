import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles=this.reflector.getAllAndOverride<number[]>('roles',[
      context.getHandler(),
      context.getClass(),            
        ])
    if (!requiredRoles) {
      return true; // Si la ruta no tiene @Roles, cualquiera autenticado entra
    }
    const { usuario } = context.switchToHttp().getRequest();   
    const hasRole = requiredRoles.includes(usuario.id_rol);  
     if (!hasRole) {
      throw new ForbiddenException('Tu rol no tiene permisos para esta acción');
    }
    return true;     
    }
}