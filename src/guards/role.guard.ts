import { ROLES_KEY } from './../decorators/roles.decorator';
import { ExecutionContext } from '@nestjs/common';
import { CanActivate, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate{

    constructor(
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext) {

        
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

        if(!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        const rolesFiltred = requiredRoles.filter((role) => role == user.role);

        return rolesFiltred.length > 0;
    }
}