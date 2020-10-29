import { EntityRepository, Repository } from "typeorm";
import { Task } from './task.entity'
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from './enums/tasks-status.enum';
import { GetTasksFilterDto } from './get-tasks-filter.dto';
import { User } from '../auth/user.entity';
import { TaskPriority } from "./enums/task-priority.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search, userId } = filterDto;
        const query = this.createQueryBuilder('task');

        if (userId) {
            const user = await User.findOne({ where: { id: userId }})
            query.andWhere('task.userId = :userId', { userId: user.id })
        }
        
        if (status) {
            query.andWhere('task.status = :status', { status })
        }

        if (search) {
            query.andWhere('(task.title ILIKE :search OR task.description ILIKE :search)', { search: `%${search}%` })
        }

        const tasks = await query.getMany();

        return tasks;
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: User
        ): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();

        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.priority = TaskPriority.MAINTENANCE;
        task.user = user
        await task.save();
        return task;
    }
}