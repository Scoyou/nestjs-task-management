import { EntityRepository, Repository } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../auth/user.entity';
import { Task } from '../tasks/task.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  private logger = new Logger('CommentRepository');

  async getComments(): Promise<Comment[]> {
    const query = this.createQueryBuilder('comment');
    const comments = await query.getMany();
    return comments;
  }

  async createComment(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const { body, taskId } = createCommentDto;
    const comment = new Comment();

    comment.body = body;
    comment.task = await Task.findOne({ id: taskId });
    comment.user = user;
    comment.taskId = taskId;
    comment.userName = user.username;
    try {
      await comment.save();
    } catch (error) {
      this.logger.error(`problem saving task ${comment.id}`, error.stack);
    }
    delete comment.task;
    delete comment.user;
    return comment;
  }
}
