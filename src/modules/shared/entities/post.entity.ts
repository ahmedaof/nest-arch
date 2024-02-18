import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // post title
  @Column({ type: 'varchar', length: 100 })
  title: string;

  // post content
  @Column({ type: 'text', nullable: true })
  content: string;

  // post Author
  @Column({ type: 'varchar', length: 100 })
  author: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
