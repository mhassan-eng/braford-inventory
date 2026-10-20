import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // ** If there is no Roles decorator
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();


    //*** Handling if for any reason request.user does not exist */
    if(!request.user){
        return false
    }
    return roles.includes(request.user.role);
  }
}
