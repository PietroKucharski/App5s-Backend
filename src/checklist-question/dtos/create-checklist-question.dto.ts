
import { IsArray, IsNumber } from "class-validator";

export class CreateChecklistQuestionDTO {
    
    @IsNumber()
    checklistId: number;
    
    @IsNumber()
    questionId: number;
}