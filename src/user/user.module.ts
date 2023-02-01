import { AuthModule } from './../auth/auth.module';
import { CheckIdMiddleware } from '../middlewares/check-id.middleware';
import { PrismaModule } from './../prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module, NestModule, MiddlewareConsumer, RequestMethod, forwardRef } from '@nestjs/common';

@Module({
    imports: [PrismaModule, forwardRef(() => AuthModule)],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CheckIdMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL,
        });
    }
}