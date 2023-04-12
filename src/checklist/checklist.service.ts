import { UpdateChecklistDTO } from './dtos/update-checklist.dto';
import { CreateChecklistDTO } from './dtos/create-checklist.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
@Injectable()
export class ChecklistService {
    constructor(private prisma: PrismaService) {}

    async create({name}: CreateChecklistDTO) {
        return this.prisma.checklist.create({
            data: {
                name
            }
        });
    }


    async read() {
        return this.prisma.checklist.findMany();
    }

    async readOne(id: number) {
        await this.exists(id)

        return this.prisma.checklist.findUnique({
            where: {
                id
            },
        })
    }

    async update(id: number, {name}: UpdateChecklistDTO) {
        await this.exists(id);

        const data: any = {}

        if(name) {
            data.name = name;
        }

        return this.prisma.checklist.update({
            data,
            where: {
                id
            }
        })
    }

    async delete(id: number) {
        await this.exists(id);

        return this.prisma.checklist.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number) {
        if(!(await this.prisma.checklist.count({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`O checklist de id: ${id} não existe`)
        }
    }
}