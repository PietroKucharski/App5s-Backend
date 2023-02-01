import { ParamId } from './../decorators/param-id.decorator';
import { RoleTypesGuard } from './../guards/role-type.guard';
import { AuthGuard } from './../guards/auth.guard';

import { RoleGuard } from './../guards/role.guard';
import { QuestionService } from './question.service';
import { UpdateQuestionDTO } from './dtos/update-question.dto';
import { CreateQuestionDTO } from './dtos/create-question.dto';
import { Body, Controller, Get, Param, Patch, Post, Delete, ParseIntPipe, UseGuards } from "@nestjs/common";
import { Role, RoleType } from '../enums/role.enum';
import { Roles } from '../decorators/roles.decorator';
@Roles(Role.ADMIN)
@UseGuards(AuthGuard, RoleGuard)
@Controller('questions')
export class QuestionController {

    constructor(private questionService: QuestionService) {}

    @Post()
    async create(@Body() data: CreateQuestionDTO) {
        return this.questionService.create(data);
    }

    @Get()
    async read() {
        return this.questionService.read();
    }

    @Get(':id')
    async readOne(@ParamId() id: number) {
        return this.questionService.readOne(id);
    }

    @Patch(':id')
    async updateOne(@Body() data: UpdateQuestionDTO, @ParamId() id: number) {
        return this.questionService.update(id, data)
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.questionService.delete(id)
    }
}