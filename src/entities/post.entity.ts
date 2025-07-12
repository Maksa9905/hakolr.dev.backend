import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  paragraph: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'simple-array' })
  tagIds: string[];

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'int', default: 0 })
  likes: number;

  @Column({ type: 'int', default: 0 })
  views: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  calculateSize() {
    const titleLength = this.title.length;
    if (titleLength <= 20) {
      this.size = 5;
    } else if (titleLength <= 40) {
      this.size = 6;
    } else if (titleLength <= 60) {
      this.size = 7;
    } else if (titleLength <= 80) {
      this.size = 8;
    } else {
      this.size = 9;
    }
  }
}
