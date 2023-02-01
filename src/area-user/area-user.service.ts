import { CreateAreaUserDTO } from './dtos/create-area-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AreaUserService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateAreaUserDTO) {
        return await this.prisma.userArea.create({
            data
        });
    }

    async read() {
        return this.prisma.userArea.findMany()
    }

    async update({areaId, userId}: CreateAreaUserDTO) {

        const data: any = {}

        if(userId) {
            data.userId = userId
        }
        
        if(areaId) {
            data.areaId = areaId
        }

        // return this.prisma.userArea.update({
        //     data,
        //     where: {
                
        //     }
        // });
    }
    
    async delete() {

    }
}