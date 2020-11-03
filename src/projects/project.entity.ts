import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  identifier: string;

  @Column()
  description: string;

  @OneToMany(type => Task, task => task.project, { eager: true } )
  tasks: Task[];


}
