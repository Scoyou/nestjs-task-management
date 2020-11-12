import { IsNotEmpty, } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    body: string;

    @IsNotEmpty()
    taskId: number;

    // @IsNotEmpty()
    // user: string;

}
