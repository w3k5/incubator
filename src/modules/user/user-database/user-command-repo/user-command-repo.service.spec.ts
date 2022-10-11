import { Test, TestingModule } from '@nestjs/testing';
import { UserCommandRepository } from './user-command-repository.service';

describe('UserCommandRepoService', () => {
	let service: UserCommandRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserCommandRepository],
		}).compile();

		service = module.get<UserCommandRepository>(UserCommandRepository);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
