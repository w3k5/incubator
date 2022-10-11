import { IsEmail, IsString, Length } from 'class-validator';
import { UnhashedPassword, UserEmail, UserLogin } from '@app/common/types/primitives';
import { UserBaseModel } from '@app/modules/user/types/base-model';

export class CreateUserDto implements UserBaseModel {
	@IsEmail()
	email: UserEmail;

	@IsString()
	@Length(3, 10)
	login: UserLogin;

	@IsString()
	@Length(6, 20)
	password: UnhashedPassword;
}
