import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { AbstractUserCommandRepository } from '@app/modules/user/user-database/user-command-repo/_abstract.user-command-repo.service';
import { CreateUserServiceRepoDto } from '@app/modules/user/dto/create-user-service-repo.dto';
import { AbstractDateService } from '@app/services/date-service/abstract.date.service';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@app/modules/user/user.schema';

@Injectable()
export class UserCommandRepository implements AbstractUserCommandRepository {
	constructor(
		private readonly dateService: AbstractDateService,
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
	) {}

	async createUser(createUserDto: CreateUserServiceRepoDto): Promise<ObjectId> {
		const createdAt = this.dateService.now();
		const { _id } = await this.userModel.create({ ...createUserDto, createdAt });
		return _id;
	}

	async deleteUser(_id: ObjectId): Promise<boolean> {
		const deleteResult = await this.userModel.deleteOne({ _id });
		return !!deleteResult.deletedCount;
	}

	async drop(): Promise<void> {
		await this.userModel.deleteMany({});
	}
}
