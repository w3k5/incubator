import { Test, TestingModule } from '@nestjs/testing';
import { UserQueryRepository } from './user-query-repository.service';

describe('UserQueryRepoService', () => {
	let service: UserQueryRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserQueryRepository],
		}).compile();

		service = module.get<UserQueryRepository>(UserQueryRepository);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
