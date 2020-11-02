import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../enums/tasks-status.enum';
import { TaskPriority } from '../enums/task-priority.enum';

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;

    @IsOptional()
    @IsIn([TaskPriority.CRITICAL, TaskPriority.MAINTENANCE, TaskPriority.PRESSING])
    priority: TaskPriority;

    @IsOptional()
    @IsNotEmpty()
    userId: number;
    
    @IsOptional()
    @IsNotEmpty()
    search: string;
}