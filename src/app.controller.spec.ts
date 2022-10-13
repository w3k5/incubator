import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { appModuleSettings } from './app.module';
import { testModuleDatabasePrepare } from '../test/utils/module-prepare';

describe('AppController', () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule(
			await testModuleDatabasePrepare(appModuleSettings),
		).compile();

		appController = app.get<AppController>(AppController);
	});

	describe('root', () => {
		it('should return "Hello World!"', () => {
			expect(appController.getHello()).toBe('Hello World!');
		});
	});
});
