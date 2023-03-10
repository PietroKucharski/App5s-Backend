import { UserService } from './../user/user.service';
import { AuthService } from './../auth/auth.service';
import { ExecutionContext } from '@nestjs/common';
import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest()
        const { authorization } = request.headers

        try {
            const data = this.authService.checkToken((authorization ?? '').split(' ')[1]);

            request.tokenPayload = data;

            request.user = await this.userService.readOne(data.id)

            return true;
        } catch (e) {
            return false;
        }
    }
}