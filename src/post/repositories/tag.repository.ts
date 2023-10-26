import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import Tag from '../entities/tag.entity';

@Injectable()
export default class TagRepository extends Repository<Tag> {
  constructor(private dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }

  async createTags(array: Array<object>): Promise<Tag[]> {
    const created = this.create(array);
    return await this.save(created);
  }

  async findTagsByWhereString(tagsInDto: string[]): Promise<Tag[]> {
    let whereStr = 'WHERE ';

    for (let i = 0; i < tagsInDto.length; i++) {
      if (i !== tagsInDto.length - 1) {
        whereStr += `data='${tagsInDto[i]}' OR `;
      } else {
        whereStr += `data='${tagsInDto[i]}'`;
      }
    }

    return await this.query(`SELECT * FROM tag ${whereStr}`);
  }
  async findPostsByTagId(id: number): Promise<Tag> {
    return await this.findOne({
      where: { id },
      relations: {
        posts: {
          tags: true,
          comments: true,
        },
      },
    });
  }
}
