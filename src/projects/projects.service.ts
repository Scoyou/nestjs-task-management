import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRepository } from './project.repository';
import { Project } from './project.entity';
import { Logger } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  private logger = new Logger('ProjectsService');

  constructor(
    @InjectRepository(ProjectRepository)
    private projectRepository: ProjectRepository,
  ) {}

  async getProjects(): Promise<Project[]> {
    return this.projectRepository.getProjects();
  }

  async getProjectById(id: number): Promise<Project> {
    const found = await this.projectRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Project with ID: ${id} not found`);
    }

    return found;
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectRepository.createProject(createProjectDto);
  }

  async deleteProject(id: number): Promise<void> {
    const result = await this.projectRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID: ${id} not found`);
    }
  }

  async updateProjectTitle(
    id: number,
    title: string,
  ): Promise<Project> {
    const project = await this.getProjectById(id);
    project.title = title;
    try {
      await project.save();
      return project;
    } catch (error) {
      this.logger.error(
        `Problem updating project title. Project ID: ${id}, Title: ${title}`,
        error.stack
      );
    }
  }

  async updateProjectDescription(
    id: number,
    description: string,
  ): Promise<Project> {
    const project = await this.getProjectById(id);
    project.description = description;
    try {
      await project.save();
      return project;
    } catch (error) {
      this.logger.error(
        `Problem updating project description. Project ID: ${id}, description: ${description}`,
        error.stack
      );
    }
  }

  async updateProjectIdentifier(
    id: number,
    identifier: string,
  ): Promise<Project> {
    const project = await this.getProjectById(id);
    project.identifier = identifier;
    try {
      await project.save();
      return project;
    } catch (error) {
      this.logger.error(
        `Problem updating project identifier. Project ID: ${id}, identifier: ${identifier}`,
        error.stack
      );
    }
  }
}
