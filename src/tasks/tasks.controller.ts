import { Body, Controller, Get, HttpException, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { SentryInterceptor } from '../sentry.interceptor';
import { CreateTaskDto } from './create-task.dto';

@UseInterceptors(SentryInterceptor)

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto)
    }
}
