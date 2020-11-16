import { AfterUpdate, BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from './enums/tasks-status.enum';
import { User } from '../auth/user.entity';
import { TaskPriority } from './enums/task-priority.enum';
import { Project } from '../projects/project.entity';
import { Comment } from '../comments/comment.entity';

// Like rails Model

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @Column()
    priority: TaskPriority;

    @ManyToOne(type => User, user => user.tasks, { eager: false })
    user: User 

    @ManyToOne(type => Project, project => project.tasks, { eager: false })
    project: Project

    @OneToMany(type => Comment, comment => comment.task, { eager: true } )
    comments: Comment[];

    @Column()
    userId: number

    @Column()
    projectIdentifier: string;

    @CreateDateColumn({ name: 'created_at' })
    public createdAt!: Date;

}