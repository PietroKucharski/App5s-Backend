import { ChecklistQuestionService } from './checklist-question.service';
import { ChecklistQuestionController } from './checklist-question.controller';
import { CheckIdMiddleware } from './../middlewares/check-id.middleware';
import { UserModule } from './../user/user.module';
import { AuthModule } from './../auth/auth.module';
import { PrismaModule } from './../prisma/prisma.module';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
@Module({
    imports: [PrismaModule, AuthModule, UserModule],
    controllers: [ChecklistQuestionController],
    providers: [ChecklistQuestionService],
    exports: []
})
export class ChecklistQuestionModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CheckIdMiddleware).forRoutes({
            path: 'checklists-questions/:id',
            method: RequestMethod.ALL,
        });
    }
}