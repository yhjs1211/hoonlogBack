import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column({
    type: 'integer',
  })
  postId: number;

  @ManyToOne(() => Post, (post) => post.comments, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postId' })
  post: Post;
}
