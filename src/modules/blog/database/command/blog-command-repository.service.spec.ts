import { Test, TestingModule } from '@nestjs/testing';
import { BlogCommandRepository } from './blog-command-repository.service';
import { DateServiceModule } from '@app/services/date-service/date-service.module';

describe('CommandService', () => {
	let service: BlogCommandRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [DateServiceModule],
			providers: [BlogCommandRepository],
		}).compile();

		service = module.get<BlogCommandRepository>(BlogCommandRepository);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
