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

@Entity('creators')
export class Creator {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PKCreators',
  })
  @Index('INCreatos', { unique: true })
  id: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  kind: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  email: string;

  @Column({ type: 'boolean', nullable: false })
  operation: boolean;

  @Column({ type: 'boolean', nullable: false })
  active: boolean;

  @CreateDateColumn({ name: 'created_at', select: false })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updated_at: Date;

  @OneToOne(() => User, (user) => user.creator)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
