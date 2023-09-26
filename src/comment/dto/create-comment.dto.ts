import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly comment: string;

  @IsString()
  readonly postId: string;
}
