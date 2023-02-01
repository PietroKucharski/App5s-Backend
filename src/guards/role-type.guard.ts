import { ExecutionContext } from '@nestjs/common';
import { CanActivate, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from '../enums/role.enum';
import { ROLETYPE_KEY } from '../decorators/role-types.decorator';

@Injectable()
export class RoleTypesGuard implements CanActivate{

    constructor(
        private reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext) {

        const requiredRoleTypes = this.reflector.getAllAndOverride<RoleType[]>(ROLETYPE_KEY, [context.getHandler(), context.getClass()])

        if(!requiredRoleTypes) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        const rolesTypesFiltred = requiredRoleTypes.filter((role) => role == user.role_types);

        return rolesTypesFiltred.length > 0;
    }
}