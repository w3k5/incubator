import { Test, TestingModule } from '@nestjs/testing';
import { UserCommandRepository } from './user-command-repository.service';
import { closeInMongodConnection, rootMongooseTestModule } from '../../../../../test/utils/mongoose-test.module';
import { DateServiceModule } from '@app/services/date-service/date-service.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/modules/user/user.schema';
import { createValidUser, createValidUserDatabase } from '../../../../../test/utils/generator';
import { ObjectId } from 'mongodb';
import { faker } from '@faker-js/faker';
import { UserQueryRepository } from '@app/modules/user/user-database/user-query-repo/user-query-repository.service';

describe('UserCommandRepoService', () => {
	let service: UserCommandRepository;
	let queryService: UserQueryRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				await rootMongooseTestModule(),
				DateServiceModule,
				MongooseModule.forFeature([
					{
						name: User.name,
						schema: UserSchema,
					},
				]),
			],
			providers: [UserCommandRepository, UserQueryRepository],
		}).compile();

		service = module.get<UserCommandRepository>(UserCommandRepository);
		queryService = module.get<UserQueryRepository>(UserQueryRepository);
	});

	afterEach(async () => {
		await closeInMongodConnection();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('Create valid user', async () => {
		const [data, expectData] = createValidUserDatabase();
		const userId = await service.createUser(data);
		expect(userId).toStrictEqual(expect.any(ObjectId));
		const userDatabase = await queryService.getUserById(userId);
		expect(userDatabase).toStrictEqual(expectData);
	});

	it('Should Delete valid user', async () => {
		const [data] = createValidUser();
		const id = await service.createUser(data);
		expect(await service.deleteUser(id)).toStrictEqual(true);
	});

	it("Shouldn't delete non existing user", async () => {
		const id = new ObjectId(faker.database.mongodbObjectId());
		expect(await service.deleteUser(id)).toStrictEqual(false);
	});

	it('Drop collection', async () => {
		const [data, expectData] = createValidUserDatabase();
		const id = await service.createUser(data);
		const userFromDatabase = await queryService.getUserById(id);
		expect(userFromDatabase).toStrictEqual(expectData);
		await service.drop();
		const nullUser = await queryService.getUserById(id);
		expect(nullUser).toStrictEqual(null);
	});
});
