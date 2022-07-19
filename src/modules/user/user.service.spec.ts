import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { UserService } from './user.service';

describe('UserService', () => {
	let service: UserService;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
			providers: [UserService],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});