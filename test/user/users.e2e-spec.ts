import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { GetAllEntities } from '@app/common/composite/database/get-all';
import { UserOutputModel } from '@app/modules/user/types/output-model';
import { UserModule } from '@app/modules/user/user.module';
import { closeInMongodConnection, rootMongooseTestModule } from '../utils/mongoose-test.module';
import { CreateUserTypeCortege, createValidUser, generateValidErrorMessageByFields } from '../utils/generator';
import { setAppConfiguration } from '../../src/config/app-configuration';
import { SortDirectionEnum } from '@app/enums/sort-direction.enum';
import { faker } from '@faker-js/faker';

const createUser = async (app: INestApplication, data?: CreateUserTypeCortege) => {
	const expectStatus = HttpStatus.CREATED;
	const [validFakeUser, expectData] = data ?? createValidUser();
	const response = await request(app.getHttpServer()).post('/users').send(validFakeUser).expect(expectStatus);
	expect(response.body).toStrictEqual(expectData);
	return { response, body: response.body, validFakeUser, expectData };
};

const createBulkOfUsers = async (app: INestApplication, length: number) => {
	const createdValidUsers = Array.from({ length }).map(createValidUser);
	const createdUsers: UserOutputModel[] = [];
	for (const {} of createdValidUsers) {
		const { body } = await createUser(app);
		createdUsers.push(body);
	}
	return { createdValidUsers, createdUsers };
};

const getUserById = (app: INestApplication, id: string, expectStatus: HttpStatus) => {
	return request(app.getHttpServer()).get(`/users/${id}`).expect(expectStatus);
};

describe('Users', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [rootMongooseTestModule(), UserModule],
		}).compile();

		app = moduleFixture.createNestApplication();

		setAppConfiguration(app);

		await app.init();
	});

	afterEach(async () => {
		await app.close();
		await closeInMongodConnection();
	});

	it('Get all request with empty query and empty database. Should return correct answer with empty items', async () => {
		const expectStatus = HttpStatus.OK;
		const response = await request(app.getHttpServer()).get('/users').expect(expectStatus);
		const body: GetAllEntities<UserOutputModel> = response.body;
		const expectResult: GetAllEntities<UserOutputModel> = {
			items: [],
			page: 1,
			pagesCount: 0,
			pageSize: 10,
			totalCount: 0,
		};
		expect(body).toStrictEqual(expectResult);
		return;
	});

	it('Should create user with valid data', async () => {
		await createUser(app);
	});

	it("Shouldn't create user with empty data", async () => {
		const expectStatus = HttpStatus.BAD_REQUEST;
		const response = await request(app.getHttpServer()).post('/users').send().expect(expectStatus);
		const expectedErrorFields = ['email', 'login', 'password'];
		expect(response.body).toStrictEqual(generateValidErrorMessageByFields(expectedErrorFields));
	});

	it("Shouldn't create user with long login", async () => {
		const expectStatus = HttpStatus.BAD_REQUEST;
		const [user] = createValidUser();
		const longLogin = 'loremlorem1';
		const response = await request(app.getHttpServer())
			.post('/users')
			.send({ ...user, login: longLogin })
			.expect(expectStatus);
		expect(response.body).toStrictEqual(generateValidErrorMessageByFields(['login']));
	});

	it("Shouldn't create user with short login", async () => {
		const expectStatus = HttpStatus.BAD_REQUEST;
		const [user] = createValidUser();
		const shortLogin = '12';
		const response = await request(app.getHttpServer())
			.post('/users')
			.send({ ...user, login: shortLogin })
			.expect(expectStatus);
		expect(response.body).toStrictEqual(generateValidErrorMessageByFields(['login']));
	});

	it("Shouldn't create user with long password", async () => {
		const expectStatus = HttpStatus.BAD_REQUEST;
		const [user] = createValidUser();
		const longPassword = 'loremloremloremlorem1';
		const response = await request(app.getHttpServer())
			.post('/users')
			.send({ ...user, password: longPassword })
			.expect(expectStatus);
		expect(response.body).toStrictEqual(generateValidErrorMessageByFields(['password']));
	});

	it("Shouldn't create user with short password", async () => {
		const expectStatus = HttpStatus.BAD_REQUEST;
		const [user] = createValidUser();
		const shortPassword = '1';
		const response = await request(app.getHttpServer())
			.post('/users')
			.send({ ...user, password: shortPassword })
			.expect(expectStatus);
		expect(response.body).toStrictEqual(generateValidErrorMessageByFields(['password']));
	});

	it("Shouldn't create user with invalid email", async () => {
		const expectStatus = HttpStatus.BAD_REQUEST;
		const [user] = createValidUser();
		const invalidEmail = 'somemail.ru';
		const response = await request(app.getHttpServer())
			.post('/users')
			.send({ ...user, email: invalidEmail })
			.expect(expectStatus);
		expect(response.body).toStrictEqual(generateValidErrorMessageByFields(['email']));
	});

	it('Should create 20 valid users, and return last 10 without queries', async () => {
		const totalUsers = 20;
		const { createdUsers } = await createBulkOfUsers(app, totalUsers);
		const createdLastTenUsers = createdUsers.reverse().slice(0, 10);
		const getAllUsersBody: GetAllEntities<UserOutputModel> = (
			await request(app.getHttpServer()).get('/users').expect(HttpStatus.OK)
		).body;
		const expectResult: GetAllEntities<UserOutputModel> = {
			items: createdLastTenUsers,
			pagesCount: 2,
			page: 1,
			pageSize: 10,
			totalCount: 20,
		};
		expect(getAllUsersBody).toStrictEqual(expectResult);
	});

	it('Should create 20 valid users, and return first 10 with query sortDirection ASC', async () => {
		const totalUsers = 20;
		const { createdUsers } = await createBulkOfUsers(app, totalUsers);
		const createdFirstTenUsers = createdUsers.slice(0, 10);
		const getAllUsersBody: GetAllEntities<UserOutputModel> = (
			await request(app.getHttpServer())
				.get('/users')
				.query({ sortDirection: SortDirectionEnum.ASC })
				.expect(HttpStatus.OK)
		).body;
		const expectResult: GetAllEntities<UserOutputModel> = {
			items: createdFirstTenUsers,
			pagesCount: 2,
			page: 1,
			pageSize: 10,
			totalCount: 20,
		};
		expect(getAllUsersBody).toStrictEqual(expectResult);
	});

	it('Should get valid user', async () => {
		const {
			body: { id },
		} = await createUser(app);
		await getUserById(app, id, HttpStatus.OK);
	});

	it("Shouln't returns user with invalid id", async () => {
		const { body } = await getUserById(app, '123', HttpStatus.BAD_REQUEST);
		expect(body).toStrictEqual(generateValidErrorMessageByFields(['id']));
	});

	it('Should deletes existing user', async () => {
		const {
			body: { id },
		} = await createUser(app);
		await getUserById(app, id, HttpStatus.OK);
		await request(app.getHttpServer()).delete(`/users/${id}`).expect(HttpStatus.NO_CONTENT);
		const { body } = await getUserById(app, id, HttpStatus.NOT_FOUND);
		expect(body).toStrictEqual({});
	});

	it("Shouldn't delete not existing user", async () => {
		const fakeId = faker.database.mongodbObjectId();
		const { body } = await request(app.getHttpServer()).delete(`/users/${fakeId}`).expect(HttpStatus.NOT_FOUND);
		expect(body).toStrictEqual({});
	});

	it("Shouldn't delete user with invalid id", async () => {
		const fakeId = '123';
		const { body } = await request(app.getHttpServer()).delete(`/users/${fakeId}`).expect(HttpStatus.BAD_REQUEST);
		expect(body).toStrictEqual(generateValidErrorMessageByFields(['id']));
	});
});
