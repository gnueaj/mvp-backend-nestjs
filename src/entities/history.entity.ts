import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity()
class History {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'int' })
	user_id: number;

	@Column({ type: 'int' })
	lecture_id: number;

	@UpdateDateColumn()
	updated_at: Date;

	@Column({ type: 'int' })
	last_time: number;
}

export { History as HistoryEntity };
