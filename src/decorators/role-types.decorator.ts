import { RoleType } from '../enums/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLETYPE_KEY = 'roletype';

export const RoleTypes = (...roles: RoleType[]) => SetMetadata('roletype', roles);