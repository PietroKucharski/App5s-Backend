import { AuthGuard } from './../guards/auth.guard';
import { RoleGuard } from './../guards/role.guard';
import { ParamId } from './../decorators/param-id.decorator';
import { UserService } from './user.service';
import { UpdatePatchUserDTO } from './dtos/update-patch-user.dto';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Body, Controller, Get, Patch, Post, UseGuards, Delete } from "@nestjs/common";
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/roles.decorator';

// @Roles(Role.ADMIN)
// @UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Post()
    async create(@Body() data: CreateUserDTO) {
        return this.userService.create(data);
    }

    @Get()
    async read() {
        return this.userService.read();
    }

    @Get(':id')
    async readOne(@ParamId() id: number) {
        return this.userService.readOne(id)
    }
    
    @Patch(':id')
    async update(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
        return this.userService.update(id, data)
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.userService.delete(id)
    }
}