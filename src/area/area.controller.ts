import { UpdateAreaDTO } from './dtos/update-area.dto';
import { ParamId } from './../decorators/param-id.decorator';
import { CreateAreaDTO } from './dtos/create-area.dto';
import { AreaService } from './area.service';
import { RoleGuard } from './../guards/role.guard';
import { RoleTypesGuard } from './../guards/role-type.guard';
import { AuthGuard } from './../guards/auth.guard';
import { Role } from './../enums/role.enum';
import { Roles } from './../decorators/roles.decorator';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, RoleTypesGuard, RoleGuard)
@Controller('areas')
export class AreaController {

    constructor(private areaService: AreaService) {}

    @Post()
    async create(@Body() data: CreateAreaDTO) {
        return this.areaService.create(data);
    }

    @Get()
    async read() {
        return this.areaService.read();
    }

    @Get(':id')
    async readOne(@ParamId() id: number) {
        return this.areaService.readOne(id)
    }

    @Patch(':id')
    async update(@Body() data: UpdateAreaDTO, @ParamId() id: number) {
        return this.areaService.update(id, data);
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.areaService.delete(id);
    }
}