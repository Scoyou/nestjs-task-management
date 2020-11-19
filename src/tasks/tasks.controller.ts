import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { SentryInterceptor } from '../sentry.interceptor';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './enums/tasks-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { TaskPriority } from './enums/task-priority.enum';
import { TaskPriorityValidationPipe } from './pipes/task-priority-validation.pipe';
import { Logger } from '@nestjs/common';

@UseInterceptors(SentryInterceptor)
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User: ${user.username} retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTasks(filterDto, user); // user is passed into the service for logging
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe) // Validates the data against the DTO
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User: ${user.username} created a task. Data: ${JSON.stringify(
        createTaskDto,
      )} `,
    );
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User: ${user.username} updated a task status. Task ID: ${id}, Status: ${status} `,
    );
    return this.tasksService.updateTaskStatus(id, status, user);
  }


  @Patch('/:id/description')
  updateTaskDescritpion(
    @Param('id', ParseIntPipe) id: number,
    @Body('description') description: string,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User: ${user.username} updated a task description. Task ID: ${id}, new descritpion: ${description} `,
    );
    return this.tasksService.updateTaskDescription(id, description, user);
  }

  @Patch('/:id/title')
  updateTaskTitle(
    @Param('id', ParseIntPipe) id: number,
    @Body('title') title: string,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User: ${user.username} updated a task title. Task ID: ${id}, new title: ${title} `,
    );
    return this.tasksService.updateTaskTitle(id, title, user);
  }

  @Patch('/:id/priority')
  updateTaskPriority(
    @Param('id', ParseIntPipe) id: number,
    @Body('priority', TaskPriorityValidationPipe) priority: TaskPriority,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User: ${user.username} updated a task priority. Task ID: ${id}, Priority: ${priority} `,
    );
    return this.tasksService.updateTaskPriority(id, priority, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User: ${user.username} deleted task ${id} `);
    return this.tasksService.deleteTask(id);
  }
}
