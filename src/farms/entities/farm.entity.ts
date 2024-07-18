import { Creator } from 'src/creators/entities/creator.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('farms')
export class Farm {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PKFarms',
  })
  @Index('INFarms', { unique: true })
  id: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;

  @Column({ type: 'integer', nullable: false })
  code_integration: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  period_service: string;

  @Column({ type: 'boolean', nullable: false })
  active: boolean;

  @CreateDateColumn({ name: 'created_at', select: false })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updated_at: Date;

  @OneToOne(() => Creator, (creator) => creator.farm)
  @JoinColumn({ name: 'creator_id' })
  creator: Creator;
}
