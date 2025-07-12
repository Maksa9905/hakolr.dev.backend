import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  label: string;

  @Column({ type: 'boolean', default: false })
  isMostPopular: boolean;

  @Column({ type: 'boolean', default: false })
  isMostLiked: boolean;
}
