import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostService } from './services/post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import TagService from './services/tag.service';
import ImageService from './services/image.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly tagService: TagService,
    private readonly imageService: ImageService,
  ) {}

  // Tag
  @Get('/tags')
  findAllTags() {
    return this.tagService.findAll();
  }

  @Get('/tags/:id')
  findOneTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.findOne(id);
  }

  // Image Upload
  @Post('/images')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log('come to here');
    console.log(file);

    const res = await this.imageService.uploadImage(file);
    return res;
  }

  // Post
  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const tagsInDto = createPostDto.tags;
    try {
      const tags = await this.tagService.create(tagsInDto);

      return await this.postService.create(createPostDto, tags);
    } catch (e) {
      return 'failed..';
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    let tags;
    if (updatePostDto.tags !== undefined) {
      tags = await this.tagService.create(updatePostDto.tags);
    }

    return this.postService.update(id, updatePostDto, tags);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }
}
