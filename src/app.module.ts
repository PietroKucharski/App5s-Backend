import { ChecklistQuestionModule } from './checklist-question/checklist-question.module';
import { ChecklistModule } from './checklist/checklist.module';
import { AreaModule } from './area/area.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Module, forwardRef } from '@nestjs/common';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    forwardRef(() => QuestionModule),
    AreaModule,
    ChecklistModule,
    ChecklistQuestionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
