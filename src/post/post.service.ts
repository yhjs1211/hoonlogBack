import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import PostRepository from './repositories/post.repository';
import { Post } from './entities/post.entity';
import Tag from './entities/tag.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(createPostDto: CreatePostDto, tags: Tag[]): Promise<Post> {
    const dataObject = {
      title: createPostDto.title,
      content: createPostDto.content,
      boardId: createPostDto.boardId,
      tags,
    };

    try {
      const post = new Post();

      Object.entries(dataObject).forEach(([key, value]) => {
        post[key] = value;
      });

      return await this.postRepository.save(post);
    } catch (e) {
      throw new BadRequestException('Please try again');
    }
  }

  async findOne(id: number) {
    return await this.postRepository.findOne({
      where: { id },
      relations: {
        tags: true,
        comments: true,
      },
    });
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    tags?: Tag[],
  ): Promise<Post> {
    try {
      const post: Post = await this.postRepository.findOne({
        where: { id },
        relations: { tags: true },
      });
      if (tags) post.tags = tags;

      const updateArr = Object.entries(updatePostDto);

      updateArr.forEach(async ([key, value]) => {
        if (key !== 'tags') post[key] = value;
      });

      return await this.postRepository.save(post);
    } catch (e) {
      throw new BadRequestException('Please try again.. in service');
    }
  }

  async remove(id: number): Promise<number> {
    return (
      await this.postRepository
        .createQueryBuilder()
        .delete()
        .where('id=:id', { id })
        .execute()
    ).affected;
  }
}
