import { AuthGuard } from './../guards/auth.guard';
import { AuthResetDTO } from './dtos/auth-reset.dto';
import { AuthForgetDTO } from './dtos/auth-forget.dto';
import { AuthRegisterDTO } from './dtos/auth-register.dto';
import { AuthLoginDTO } from './dtos/auth-login.dto';
import { Body, Req } from '@nestjs/common';
import { Post, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../decorators/user.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}
    
    @Post('login')
    async login(@Body() {email, password}: AuthLoginDTO) {
        return this.authService.login(email, password);
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() {email}: AuthForgetDTO) {
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() {password, token}: AuthResetDTO) {
        return this.authService.reset(password, token);
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user) {
        return {
            user
        }
    }
}