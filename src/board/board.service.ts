import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import BoardRepository from './board.repository';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async create(createBoardDto: CreateBoardDto) {
    await this.boardRepository
      .createQueryBuilder()
      .insert()
      .values(createBoardDto)
      .execute();
    return 'Success';
  }

  findAllPostsByBoardId(id: number) {
    return `This action returns all board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
