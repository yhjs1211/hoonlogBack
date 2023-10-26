import { BadRequestException, Injectable } from '@nestjs/common';
import TagRepository from '../repositories/tag.repository';
import Tag from '../entities/tag.entity';

@Injectable()
export default class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async create(tagsInDto: string[]): Promise<Tag[]> {
    try {
      const willCreateTagList = [];
      const tagDatas = (
        await this.tagRepository.createQueryBuilder().getMany()
      ).map((tag) => tag.data);

      tagsInDto.forEach((dtoTag) => {
        let match = false;
        if (tagDatas.includes(dtoTag)) {
          match = true;
        }
        if (!match) willCreateTagList.push({ data: dtoTag });
      });
      await this.tagRepository.createTags(willCreateTagList);
      return await this.tagRepository.findTagsByWhereString(tagsInDto);
    } catch (e) {
      throw new BadRequestException('Please try again');
    }
  }

  findPostsByTagId(id: number): Promise<Tag> {
    return this.tagRepository.findPostsByTagId(id);
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find();
  }
}
