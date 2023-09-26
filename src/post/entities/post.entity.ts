import { Comment } from 'src/comment/entities/comment.entity';
import {
  Column,
  Entity,
  JoinColumn,
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

  @Column({
    type: 'integer',
  })
  boardId: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => Board, (board) => board.posts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable({
    name: 'Post_Tag',
  })
  tags: Tag[];
}
