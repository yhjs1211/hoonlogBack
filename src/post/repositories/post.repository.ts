import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';

@Injectable()
export default class PostRepository extends Repository<Post> {
  constructor(private dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }
}
