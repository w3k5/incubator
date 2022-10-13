import { Test, TestingModule } from '@nestjs/testing';
import { BlogQueryRepository } from './blog-query-repository.service';

describe('QueryService', () => {
	let service: BlogQueryRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [BlogQueryRepository],
		}).compile();

		service = module.get<BlogQueryRepository>(BlogQueryRepository);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
