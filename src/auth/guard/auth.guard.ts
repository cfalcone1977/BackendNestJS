import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class GuardGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(context);
    console.log(context.switchToHttp().getRequest())
    const request=context.switchToHttp().getRequest();
    console.log(request);
    return true;
  }
}
