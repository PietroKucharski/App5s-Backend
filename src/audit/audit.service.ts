import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class AuditService {

    constructor(private prisma: PrismaService) {}

    async create() {

    }

    async read() {

    }

    async readOne() {
        
    }

    async update() {

    }

    async delete() {

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