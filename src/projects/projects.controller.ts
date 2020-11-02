import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SentryInterceptor } from '../sentry.interceptor';
import { Logger } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@UseInterceptors(SentryInterceptor)
@UseGuards(AuthGuard())
@Controller('projects')
export class ProjectsController {
  private logger = new Logger('ProjectsController');
  constructor(private projectsService: ProjectsService) {}

  @Get()
  getProjects(): Promise<Project[]> {
    return this.projectsService.getProjects();
  }

  @Get('/:id')
  getProjectById(@Param('id', ParseIntPipe) id: number): Promise<Project> {
    return this.projectsService.getProjectById(id);
  }

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.createProject(createProjectDto);
  }

  @Patch('/:id/title')
  updateProjectTitle(
    @Param('id', ParseIntPipe) id: number,
    @Body('title') title: string,
  ): Promise<Project> {
    return this.projectsService.updateProjectTitle(id, title);
  }

  @Patch('/:id/description')
  updateProjectDescription(
    @Param('id', ParseIntPipe) id: number,
    @Body('description') description: string,
  ): Promise<Project> {
    return this.projectsService.updateProjectDescription(id, description);
  }

  @Patch('/:id/identifier')
  updateProjectIdentifier(
    @Param('id', ParseIntPipe) id: number,
    @Body('identifier') identifier: string,
  ): Promise<Project> {
    return this.projectsService.updateProjectIdentifier(id, identifier);
  }
}
