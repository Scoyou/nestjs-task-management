import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsFilterDto } from './dto/get-comments-filter.dto';
import { SentryInterceptor } from '../sentry.interceptor';
import { AuthGuard } from '@nestjs/passport';

@UseInterceptors(SentryInterceptor)
@UseGuards(AuthGuard())
@Controller('comments')
export class CommentsController {
    private logger = new Logger('CommentsController');
    constructor(private commentsService: CommentsService) {}

    @Get()
    getComments(
        @Query(ValidationPipe) filterDto: GetCommentsFilterDto,
      ): Promise<Comment[]> {
        return this.commentsService.getComments(); 
      }

      @Get('/:id')
      getCommentById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
      ): Promise<Comment> {
        return this.commentsService.getCommentById(id, user);
      }

      @Post()
      createComment(
          @Body() createCommentDto: CreateCommentDto,
          @GetUser() user: User
          ): Promise<Comment> {
        return this.commentsService.createComment(createCommentDto, user);
      }

      @Patch('/:id/edit')
      updateComment(
        @Param('id', ParseIntPipe) id: number,
        @Body('body') body: string,
        @GetUser() user: User,
      ): Promise<Comment> {
        return this.commentsService.updateComment(id, body, user);
      }

      @Delete('/:id')
      deleteComment(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
      ): Promise<void> {
        this.logger.verbose(`User: ${user.username} deleted comment ${id} `);
        return this.commentsService.deleteComment(id);
      }
}
