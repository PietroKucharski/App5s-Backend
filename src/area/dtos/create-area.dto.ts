import { IsNumber, IsString } from "class-validator";

export class CreateAreaDTO {

    @IsNumber()
    id: number;

    @IsString()
    name: string;
}