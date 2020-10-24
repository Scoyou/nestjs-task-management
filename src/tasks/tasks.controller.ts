import { Body, Controller, Get, HttpException, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { SentryInterceptor } from '../sentry.interceptor';

@UseInterceptors(SentryInterceptor)

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(
        @Body('title') title: string,
        @Body('descritpion') description: string,
    ): Task {
        return this.tasksService.createTask(title, description)
    }
}
