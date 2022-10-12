import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserDatabaseModule } from '@app/modules/user/user-database/user-database.module';
import { PasswordModule } from '@app/services/password/password.module';
import { UserService } from '@app/modules/user/user.service';

describe('UserController', () => {
	let controller: UserController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [UserDatabaseModule, PasswordModule],
			controllers: [UserController],
			providers: [UserService],
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
