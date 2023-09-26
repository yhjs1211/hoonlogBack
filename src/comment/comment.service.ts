import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import CommentRepository from './comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async create(createCommentDto: CreateCommentDto): Promise<string> {
    const createObject = {
      userId: createCommentDto.userId,
      comment: createCommentDto.comment,
      postId: parseInt(createCommentDto.postId),
    };
    try {
      await this.commentRepository
        .createQueryBuilder()
        .insert()
        .into(Comment)
        .values(createObject)
        .execute();
      return 'success';
    } catch (e) {
      throw new BadRequestException('Please try again');
    }
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<string> {
    try {
      await this.commentRepository
        .createQueryBuilder()
        .update()
        .set(updateCommentDto)
        .where('id = :id', { id })
        .execute();
      return 'updated';
    } catch (e) {
      throw new BadRequestException('Please try again');
    }
  }

  async remove(id: number): Promise<string> {
    try {
      await this.commentRepository
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id })
        .execute();
      return 'deleted';
    } catch (e) {
      throw new BadRequestException('Please try again');
    }
  }
}
