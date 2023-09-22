import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly comment: string;

  @IsNumber()
  readonly postId: number;
}
