import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class CommentsService {
    private logger = new Logger('TasksService');
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
  ) {}

  async getComments(): Promise<Comment[]> {
    return this.commentRepository.getComments();
  }

  async getCommentById(id: number, user: User): Promise<Comment> {
    const found = await this.commentRepository.findOne({ where: { id } });

    if (!found) {
      this.logger.error(
        `User ${user.username} tried to fetch non-existant comment ${id}`,
      );
      throw new NotFoundException(`Comment with ID: ${id} not found`);
    }

    return found;
  }

  async createComment(
      createCommentDto: CreateCommentDto,
      user: User
      ): Promise<Comment> {
    return this.commentRepository.createComment(createCommentDto, user);
  }

  async updateComment(
    id: number,
    body: string,
    user: User,
  ): Promise<Comment> {
    const comment = await this.getCommentById(id, user);
    comment.body = body;
    try {
      await comment.save();
      return comment;
    } catch (error) {
      this.logger.error(
        `Problem updating comment body. comment ID: ${id}, User: ${user.username}, body: ${body}`,
        error.stack
      );
    }
  }

  async deleteComment(id: number): Promise<void> {
    const result = await this.commentRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`comment with ID: ${id} not found`);
    }
  }
}
