import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

describe('UserController', () => {
	let controller: UserController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
		}).compile();

		controller = module.get<UserController>(UserController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	// it('should return smth', () => {
	// 	expect(
	// 		controller.getAllUsers({
	// 			sortBy: 'createdAt',
	// 			pageNumber: 1,
	// 			pageSize: 10,
	// 			sortDirection: SortDirectionEnum.DESC,
	// 			searchEmailTerm: null,
	// 			searchLoginTerm: null,
	// 		}),
	// 	).toBeDefined();
	// });
});
