import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import { AbstractPasswordService } from '@app/services/password/interfaces';
import { HashedPassword } from '@app/common/types/primitives';
import { AbstractUserCommandRepository } from '@app/modules/user/user-database/user-command-repo/_abstract.user-command-repo.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
	constructor(
		private readonly passwordService: AbstractPasswordService,
		private readonly userCommandRepository: AbstractUserCommandRepository,
	) {}

	async createUser({ login, email, password: unhashedPassword }: CreateUserDto): Promise<ObjectId> {
		const hashedPassword: HashedPassword = await this.passwordService.hashPassword(unhashedPassword);
		return this.userCommandRepository.createUser({ login, password: hashedPassword, email });
	}

	async deleteUser(id: ObjectId): Promise<boolean> {
		return this.userCommandRepository.deleteUser(id);
	}

	async drop(): Promise<void> {
		await this.userCommandRepository.drop();
	}
}
