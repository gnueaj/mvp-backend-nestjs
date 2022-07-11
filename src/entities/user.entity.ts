import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { HistoryEntity } from './history.entity';

@Entity()
class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50, unique: true })
	email: string;

	@CreateDateColumn({ type: 'datetime' })
	joined_at: Date;

	@Column({ type: 'int', default: 4 })
	privilege: number;

	@OneToMany(() => HistoryEntity, (history) => history.user)
	histories: History[];
}

export { User as UserEntity };
