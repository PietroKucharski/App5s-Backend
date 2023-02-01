import { Roles } from './../decorators/roles.decorator';
import { Role } from './../enums/role.enum';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './../guards/auth.guard';
import { RoleTypesGuard } from './../guards/role-type.guard';
import { RoleGuard } from './../guards/role.guard';
import { Delete } from '@nestjs/common';
import { Patch } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
@Roles(Role.ADMIN)
@UseGuards(AuthGuard, RoleTypesGuard, RoleGuard)
@Controller('audit')
export class AuditController {
    @Post()
    async create() {
        
    }

    @Get()
    async read() {
        
    }

    @Get(':id')
    async readOne() {
        
    }

    @Patch(':id')
    async updateOne() {
        
    }

    @Delete(':id')
    async delete() {
        
    }
}