import { EntityRepository, Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { Logger, NotFoundException } from '@nestjs/common';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  private logger = new Logger('ProjectRepository');

  async getProjects(): Promise<Project[]> {
    const query = this.createQueryBuilder('project');
    const projects = await query.getMany();
    return projects;
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const { title, description, identifier } = createProjectDto;
    const project = new Project();

    project.title = title;
    project.description = description;
    project.identifier = identifier;

    try {
      await project.save();
    } catch (error) {
      this.logger.error(`problem saving task ${project.id}`, error.stack);
    }

    return project;
  }
}
