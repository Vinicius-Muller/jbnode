import { Creator } from 'src/creators/entities/creator.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PKUsers',
  })
  @Index('INUsers', { unique: true })
  id: string;

  @Column({ type: 'varchar', length: 60, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  kind: string;

  @OneToMany(() => Role, (role) => role.user)
  @JoinColumn({ name: 'roles' })
  roles: Role[];

  @OneToOne(() => Creator, (creator) => creator.user)
  @JoinColumn({ name: 'creator_id' })
  creator: Creator;

  @CreateDateColumn({ name: 'created_at', select: false })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updated_at: Date;
}
