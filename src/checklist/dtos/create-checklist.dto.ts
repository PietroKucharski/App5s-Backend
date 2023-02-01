import { CreateQuestionDTO } from './../../question/dtos/create-question.dto';
import { IsString } from "class-validator";

export class CreateChecklistDTO {

    @IsString()
    name: string;
}