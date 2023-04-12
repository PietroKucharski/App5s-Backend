import { IsNumber } from "class-validator";

export class CreateAuditDTO {
    @IsNumber()
    checklistId: number;

    @IsNumber()
    areaId: number;

    @IsNumber()
    accept: number;
    
    @IsNumber()
    reject: number;

    @IsNumber()
    partial: number;
}