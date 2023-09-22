import { Comment } from 'src/comment/entities/comment.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Tag from './tag.entity';
import { Board } from 'src/board/entities/board.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'text',
  })
  content: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => Board, (board) => board.posts)
  board: Board;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({
    name: 'Post_Tag',
  })
  tags: Tag[];
}
