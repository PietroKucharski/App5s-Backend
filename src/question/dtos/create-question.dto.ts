import { IsString } from "class-validator";

export class CreateQuestionDTO {

    @IsString()
    question: string;
}