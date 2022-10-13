import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { closeInMongodConnection } from '../../../test/utils/mongoose-test.module';
import { SortDirectionEnum } from '@app/enums/sort-direction.enum';
import { userModuleSettings } from '@app/modules/user/user.module';
import { testModuleDatabasePrepare } from '../../../test/utils/module-prepare';

describe('UserController', () => {
	let controller: UserController;

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule(
			await testModuleDatabasePrepare(userModuleSettings),
		).compile();

		controller = module.get<UserController>(UserController);
	});

	afterAll(async () => {
		await closeInMongodConnection();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should return smth', () => {
		expect(
			controller.getAllUsers({
				sortBy: 'createdAt',
				pageNumber: 1,
				pageSize: 10,
				sortDirection: SortDirectionEnum.DESC,
				searchEmailTerm: null,
				searchLoginTerm: null,
			}),
		).toBeDefined();
	});
});
