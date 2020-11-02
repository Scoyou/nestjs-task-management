import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ProjectRepository } from './project.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectRepository]), AuthModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
