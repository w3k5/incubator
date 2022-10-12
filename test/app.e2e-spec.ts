import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { closeInMongodConnection, rootMongooseTestModule } from './utils/mongoose-test.module';
import { setAppConfiguration } from '../src/config/app-configuration';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [rootMongooseTestModule(), AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();

		setAppConfiguration(app);

		await app.init();
	});

	afterAll(async () => {
		await app.close();
		await closeInMongodConnection();
	});

	it('/ (GET)', () => {
		return request(app.getHttpServer()).get('/').expect(HttpStatus.OK).expect('Hello World!');
	});
});
