import { IsNotEmpty, } from "class-validator";
import { Project } from '../../projects/project.entity';

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    project: string;

}

