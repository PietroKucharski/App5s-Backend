import { BadRequestException } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { AuthRegisterDTO } from './dtos/auth-register.dto';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

    private issuer: 'API App5s'
    private audience: 'users'

    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
        private userService: UserService
    ) {}

    createToke(user: User) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            }, {
                expiresIn: '1 day',
                subject: String(user.id),
                issuer: String(this.issuer),
                audience: String(this.audience),
            })
        }
    }

    checkToken(token: string) {
        try {
            const data = this.jwtService.verify(token, {
                issuer: this.issuer,
                audience: this.audience
            });

            return data;
        } catch (e) {
            throw new BadRequestException(e)
        }
    }

    isValidTokne(token: string) {
        try {
            this.checkToken(token);
            return true;
        } catch (e) {
            return false
        }
    }

    async login(email: string, password: string) {

        const user = await this.prisma.user.findFirst({
            where: {
                email
            },
        });

        if(!user) {
            throw new NotFoundException('Email ou senha incorretos');
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new NotFoundException('Email e/ou senha incorretos');
        }

        const token = this.createToke(user);
        const checktoken = this.checkToken(token.accessToken)
        const userData = await this.userService.readOne(checktoken.id)
        return {
            token,
            userData
        }
        // return this.userService.readOne(checktoken.id)
    }

    async forget(email: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            },
        });

        if(!user) {
            throw new NotFoundException('Email está incorreto');
        }

        return true;
    }

    async reset(password: string, token: string) {

        const id = 0
        const user = await this.prisma.user.update({
            where: {
                id
            },
            data: {
                password
            }
        });

        return this.createToke(user);
    }

    async register(data: AuthRegisterDTO) {
        const user = await this.userService.create(data);

        return this.createToke(user);
    }

    async me(data: AuthRegisterDTO) {
        const user = await this.userService.create(data);

        return this.createToke(user);
    }
}