import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import { faker } from '@faker-js/faker';
import { generateError, generateErrorMessage } from '../../src/error/generator';
import { ObjectId } from 'mongodb';

interface expectUserData {
	id: string;
	email: string;
	login: string;
	createdAt: Date;
}

export const createValidUser = (): [CreateUserDto, expectUserData] => {
	const password = faker.internet.password();
	const email = faker.internet.email();
	const login = faker.name.firstName();
	return [
		{
			password,
			email,
			login,
		},
		{
			id: expect.any(String),
			email,
			login,
			createdAt: expect.any(String),
		},
	];
};

export const createValidUserDatabase = (): [CreateUserDto, expectUserData] => {
	const password = faker.internet.password();
	const email = faker.internet.email();
	const login = faker.name.firstName();
	return [
		{
			password,
			email,
			login,
		},
		{
			id: expect.any(ObjectId),
			email,
			login,
			createdAt: expect.any(Date),
		},
	];
};

export type CreateUserTypeCortege = ReturnType<typeof createValidUser>;

export const generateValidErrorMessageByFields = (expectedErrorFields: string[]) => {
	const generatedErrors = expectedErrorFields.map((field) => generateError({ field, message: expect.any(String) }));
	return generateErrorMessage(generatedErrors);
};
