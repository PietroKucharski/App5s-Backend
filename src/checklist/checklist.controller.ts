import { UpdateChecklistDTO } from './dtos/update-checklist.dto';
import { CreateChecklistDTO } from './dtos/create-checklist.dto';
import { ChecklistService } from './checklist.service';
import { RoleGuard } from './../guards/role.guard';
import { RoleTypesGuard } from './../guards/role-type.guard';
import { AuthGuard } from './../guards/auth.guard';
import { Role } from './../enums/role.enum';
import { Roles } from './../decorators/roles.decorator';
import { Controller, UseGuards, Post, Get, Patch, Delete, Body } from '@nestjs/common';
import { ParamId } from '../decorators/param-id.decorator';
@Roles(Role.ADMIN)
@UseGuards(AuthGuard, RoleTypesGuard, RoleGuard)
@Controller('checklists')
export class ChecklistController {

    constructor(private checklistService: ChecklistService) {}

    @Post() 
    async create(@Body() data: CreateChecklistDTO) {
        return this.checklistService.create(data);
    }

    @Get() 
    async read() {
        const response = await this.checklistService.read();
        return response
    }

    @Get(':id')
    async readOne(@ParamId() id: number) {
        return this.checklistService.readOne(id);
    }

    @Patch(':id')
    async updateOne(@Body() data: UpdateChecklistDTO, @ParamId() id: number) {
        return this.checklistService.update(id, data);
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.checklistService.delete(id);
    }
}