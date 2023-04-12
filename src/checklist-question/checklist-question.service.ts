import { UpdateChecklistQuestionDTO } from './dtos/update-checklist-question.dto';
import { CreateChecklistQuestionDTO } from './dtos/create-checklist-question.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
@Injectable()
export class ChecklistQuestionService {
    constructor(private prisma: PrismaService) {}

    async create({checklistId, questionId}: CreateChecklistQuestionDTO) {
        return this.prisma.checklistQuestion.create({
            data: {
                checklistId,
                questionId
            }
        });
        
    }


    async read() {
        return this.prisma.checklistQuestion.findMany({
            include: {
                questions: true,
                checklists: true
            }
        })
    }

    async readOne(checklistId: number) {
        await this.existsChecklistQuestion(checklistId)

        return this.prisma.checklistQuestion.findMany({
            where: {
                checklistId
            }, include: {
                questions: true
            }
        })
    }

    async update(id: number, {questionId, checklistId}: UpdateChecklistQuestionDTO) {
        await this.existsChecklistQuestion(id);

        const data:any = {}

        if(questionId) {
            data.questionId = questionId;
        }

        if(checklistId) {
            data.checklistId = checklistId;
        }

        // return this.prisma.checklistQuestion.upsert({

        // });
    }

    async delete(checklistId: number) {
        await this.existsChecklistQuestion(checklistId);

        // return this.prisma.checklistQuestion.delete({
        //     where: {
        //         questionId_checklistId
        //     }
        // })
    }

    async existsChecklistQuestion(checklistId: number) {
        if(!(await this.prisma.checklistQuestion.count({
            where: {
                checklistId
            }
        }))) {
            throw new NotFoundException(`O checklist de id: ${checklistId} não existe`)
        }
    }

    async existsChecklist(id: number) {
        if(!(await this.prisma.checklist.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`O checklist de id: ${id} não existe`)
        }
    }

    async existsQuestion(id: number) {
        if(!(await this.prisma.question.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`O checklist de id: ${id} não existe`)
        }
    }
}