import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { User } from '../../auth/user.entity';

export class GetCommentsFilterDto {
    @IsOptional()
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    taskId: number;
}