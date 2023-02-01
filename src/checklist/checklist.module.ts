import { CheckIdMiddleware } from './../middlewares/check-id.middleware';
import { UserModule } from './../user/user.module';
import { AuthModule } from './../auth/auth.module';
import { PrismaModule } from './../prisma/prisma.module';
import { ChecklistService } from './checklist.service';
import { ChecklistController } from './checklist.controller';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
@Module({
    imports: [PrismaModule, AuthModule, UserModule],
    controllers: [ChecklistController],
    providers: [ChecklistService],
    exports: []
})
export class ChecklistModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CheckIdMiddleware).forRoutes({
            path: 'checklists/:id',
            method: RequestMethod.ALL,
        });
    }
}