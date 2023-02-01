import { UpdateChecklistQuestionDTO } from './dtos/update-checklist-question.dto';
import { CreateChecklistQuestionDTO } from './dtos/create-checklist-question.dto';
import { ChecklistQuestionService } from './checklist-question.service';
import { ParamId } from './../decorators/param-id.decorator';
import { AuthGuard } from './../guards/auth.guard';
import { RoleGuard } from './../guards/role.guard';
import { Body, Controller, Get, Patch, Post, Delete, UseGuards } from "@nestjs/common";
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/roles.decorator';

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, RoleGuard)
@Controller('checklists-questions')
export class ChecklistQuestionController {

    constructor(private checklistQuestionService: ChecklistQuestionService) {}

    @Post()
    async create(@Body() data: CreateChecklistQuestionDTO) {
        return this.checklistQuestionService.create(data)
    }

    @Get()
    async read() {
        return this.checklistQuestionService.read()
    }

    @Get(':id')
    async readOne(@ParamId() id: number) {
        return this.checklistQuestionService.readOne(id);
    }

    @Patch(':id')
    async updateOne(@Body() data: UpdateChecklistQuestionDTO, @ParamId() id: number) {
        return this.checklistQuestionService.update(id, data)
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.checklistQuestionService.delete(id)
    }
}