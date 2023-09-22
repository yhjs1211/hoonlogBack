import { DataSource, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class CommentRepository extends Repository<Comment> {
  constructor(private dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }
}
