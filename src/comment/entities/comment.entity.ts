import { Post } from 'src/post/entities/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  userId: string;

  @Column({
    type: 'text',
  })
  comment: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;
}
