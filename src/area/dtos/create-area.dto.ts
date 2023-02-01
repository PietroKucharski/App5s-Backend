import { IsString } from "class-validator";

export class CreateAreaDTO {

    @IsString()
    description: string;
}