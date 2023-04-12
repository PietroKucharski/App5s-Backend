import { UpdateAreaDTO } from './dtos/update-area.dto';
import { CreateAreaDTO } from './dtos/create-area.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AreaService {
    constructor(private prisma: PrismaService) {}

    async create({name, id}: CreateAreaDTO) {
        if(await this.prisma.area.count({
            where: {
                name: name,
                id: id
            }
        })) {

        }
        return await this.prisma.area.create({
            data: {
                name,
                id
            }
        })
    }

    async read() {
        return this.prisma.area.findMany();
    }

    async readOne(id: number) {
        await this.exists(id);

        return this.prisma.area.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: number, {name}: UpdateAreaDTO) {
        await this.exists(id);

        const data: any = {}

        if(name) {
            data.description = name
        }

        return this.prisma.area.update({
            data,
            where: {
                id
            }
        });
    }

    async delete(id: number) {
        await this.exists(id);

        return this.prisma.area.delete({
            where: {
                id
            }
        });
    }

    async exists(id: number) {
        if(!(await this.prisma.area.count({
            where: {
            id 
            }
        }))) {
            throw new NotFoundException(`O usuário ${id} não existe`)
        }
    }
}