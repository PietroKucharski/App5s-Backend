import { UpdateQuestionDTO } from './dtos/update-question.dto';
import { PrismaService } from './../prisma/prisma.service';
import { CreateQuestionDTO } from './dtos/create-question.dto';

import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class QuestionService {

    constructor(private prisma: PrismaService) {}

    async create(data: CreateQuestionDTO) {
        return await this.prisma.question.create({
            data
        });
    }

    async read() {
        return this.prisma.question.findMany();

    }

    async readOne(id: number) {
        
        await this.exists(id);

        return this.prisma.question.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: number, {question}: UpdateQuestionDTO) {

        await this.exists(id);

        const data: any = {}

        if(question) {
            data.question = question;
        }

        return this.prisma.question.update({
            data,
            where: {
                id
            }
        });
    }

    async delete(id: number) {

        await this.exists(id);

        return this.prisma.question.delete({
            where: {
                id
            }
        });
    }

    async exists(id: number) {
        if(!(await this.prisma.question.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`A pergunta de id: ${id} não existe`)
        }
    }
}