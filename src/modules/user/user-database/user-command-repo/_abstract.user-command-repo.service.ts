import { ObjectId } from 'mongodb';
import { AbstractBaseRepository } from '@app/common/base-repo/base-repo.abstract';
import { CreateUserServiceRepoDto } from '@app/modules/user/dto/create-user-service-repo.dto';

export abstract class AbstractUserCommandRepository implements AbstractBaseRepository {
	abstract createUser: (createUserDto: CreateUserServiceRepoDto) => Promise<ObjectId>;
	abstract deleteUser: (id: ObjectId) => Promise<boolean>;
	abstract drop: () => Promise<void>;
}
