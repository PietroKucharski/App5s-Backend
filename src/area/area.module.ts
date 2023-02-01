import { CheckIdMiddleware } from './../middlewares/check-id.middleware';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { UserModule } from './../user/user.module';
import { AuthModule } from './../auth/auth.module';
import { PrismaModule } from './../prisma/prisma.module';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

@Module({
    imports: [PrismaModule, AuthModule, UserModule],
    controllers: [AreaController],
    providers: [AreaService],
    exports: []
})
export class AreaModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CheckIdMiddleware).forRoutes({
            path: 'areas/:id',
            method: RequestMethod.ALL,
        });
    }
}