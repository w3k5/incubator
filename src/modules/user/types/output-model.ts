import { UserBaseModel } from '@app/modules/user/types/base-model';

export type UserOutputModel = Omit<UserBaseModel, 'password'> & {
	id: string;
	createdAt: Date;
};
