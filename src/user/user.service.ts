import { UpdatePatchUserDTO } from './dtos/update-patch-user.dto';
import { PrismaService } from './../prisma/prisma.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    async create(data: CreateUserDTO) {
        if(await this.prisma.user.count({
            where: {
                email: data.email,
            }
        })) {
            throw new BadRequestException('Este email já está sendo utilizado');
        }
        
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);

        return this.prisma.user.create({
            data
        })
    }

    async read() {
        return this.prisma.user.findMany();
    }

    async readOne(id: number) {
        
        await this.exists(id);

        return this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async update(id: number, {email, name, password, role, areaId, ativo}: UpdatePatchUserDTO) {

        await this.exists(id);

        const data: any = {}

        if(email) {
            data.email = email;
        }

        if(name) {
            data.name = name;
        }

        if(password) {
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(password, salt);
        }

        if(role) {
            data.role = role;
        }

        if(areaId) {
            data.areaId = areaId;
        }

        if(ativo) {
            data.ativo = ativo;
        }

        return this.prisma.user.update({
            data,
            where: {
                id
            }
        });
    }

    async delete(id: number) {

        await this.exists(id);

        return this.prisma.user.delete({
            where: {
                id
            }
        });
    }

    async exists(id: number) {
        if(!(await this.prisma.user.count({
            where: {
               id 
            }
        }))) {
            throw new NotFoundException(`O usuário ${id} não existe`)
        }
    }
}