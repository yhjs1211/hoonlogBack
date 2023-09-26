import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import PostRepository from './repositories/post.repository';
import TagRepository from './repositories/tag.repository';
import TagService from './tag.service';

@Module({
  controllers: [PostController],
  providers: [PostService, TagService, PostRepository, TagRepository],
})
export class PostModule {}
