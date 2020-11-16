import { IsNotEmpty, } from "class-validator";
import { TaskPriority } from "../enums/task-priority.enum";

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    project: string;

    @IsNotEmpty()
    priority: TaskPriority;

}

