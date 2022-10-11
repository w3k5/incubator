import { IsEmail, IsString, Length } from 'class-validator';
import { HashedPassword, UserEmail, UserLogin } from '@app/common/types/primitives';

export class CreateUserServiceRepoDto {
	@IsEmail()
	email: UserEmail;

	@IsString()
	@Length(3, 10)
	login: UserLogin;

	@IsString()
	password: HashedPassword;
}
