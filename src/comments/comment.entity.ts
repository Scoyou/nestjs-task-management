import { AfterUpdate, BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../auth/user.entity';
import { Project } from '../projects/project.entity';
import { Task } from '../tasks/task.entity';

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @ManyToOne(type => User, user => user.comments, { eager: false })
    user: User 

    @ManyToOne(type => Task, task => task.comments, { eager: false, onDelete: "CASCADE"})
    task: Task

    @Column()
    userName: string;

    @Column()
    taskId: number;

    @CreateDateColumn({ name: 'created_at' })
    public createdAt!: Date;

}