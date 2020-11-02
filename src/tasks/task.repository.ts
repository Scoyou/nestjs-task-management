import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './enums/tasks-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';
import { TaskPriority } from './enums/task-priority.enum';
import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Project } from 'src/projects/project.entity';
import { ProjectRepository } from '../projects/project.repository';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger();

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search, userId } = filterDto;
    const query = this.createQueryBuilder('task');

    if (userId) {
      const user = await User.findOne({ where: { id: userId } });
      query.andWhere('task.userId = :userId', { userId: user.id });
    }

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title ILIKE :search OR task.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to fetch tasks for user: ${
          user.username
        }. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description, project } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.priority = TaskPriority.MAINTENANCE;
    task.user = user;
    task.project = await Project.findOne({ identifier: project })

    if (task.project === undefined) {
      throw new NotFoundException(`Could not find a project with identifier ${project}`)
    }

    task.projectIdentifier = project

    try {
      await task.save();
    } catch (error) {
      this.logger.error(
        `problem saving task ${task.id} as user ${user.username}`,
        error.stack,
      );
    }

    delete task.user;
    delete task.project;
    return task;
  }
}
