import { UserModule } from './../user/user.module';
import { AuthModule } from './../auth/auth.module';
import { QuestionService } from './question.service';
import { PrismaModule } from './../prisma/prisma.module';
import { QuestionController } from './question.controller';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CheckIdMiddleware } from '../middlewares/check-id.middleware';

@Module({
    imports: [PrismaModule, AuthModule, UserModule],
    controllers: [QuestionController],
    providers: [QuestionService],
    exports: [],
})
export class QuestionModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CheckIdMiddleware).forRoutes({
            path: 'questions/:id',
            method: RequestMethod.ALL,
        });
    }
}