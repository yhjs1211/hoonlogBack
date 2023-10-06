import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './post.controller';
import PostRepository from './repositories/post.repository';
import TagRepository from './repositories/tag.repository';
import TagService from './services/tag.service';
import { v2 as cloudinary } from 'cloudinary';
import ImageService from './services/image.service';

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    TagService,
    ImageService,
    PostRepository,
    TagRepository,
    {
      provide: 'CLOUDINARY',
      useFactory: () => {
        return cloudinary.config({
          cloud_name: process.env.CLOUD_NAME,
          api_key: process.env.CLOUD_API_KEY,
          api_secret: process.env.CLOUD_API_SECRET,
        });
      },
    },
  ],
})
export class PostModule {}
