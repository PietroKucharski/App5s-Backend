import { IsNumber } from "class-validator";

export class CreateAreaUserDTO {

    @IsNumber()
    areaId: number;

    @IsNumber()
    userId: number;
}