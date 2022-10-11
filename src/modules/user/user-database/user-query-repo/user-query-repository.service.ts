import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { AbstractUserQueryRepository } from '@app/modules/user/user-database/user-query-repo/_abstract.user-query-repo.service';
import { Model } from 'mongoose';
import { Nullable } from '@app/common/union/nullable';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@app/modules/user/user.schema';
import { UserOutputModel } from '@app/modules/user/types/output-model';
import { GetAllUsersSearchParamsDto } from '@app/modules/user/dto/get-all-users-params.dto';
import { GetAllRepositoryResponse } from '@app/common/composite/database/get-all';
import { SortDirectionEnum } from '@app/enums/sort-direction.enum';
import { LogicalBaseRepository } from '@app/common/base-repo/logical-base-repo';

@Injectable()
export class UserQueryRepository extends LogicalBaseRepository implements AbstractUserQueryRepository {
	constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
		super();
	}

	async getUserById(_id: ObjectId): Promise<Nullable<UserOutputModel>> {
		const [userCandidate] = await this.userModel.aggregate([
			{
				$match: { _id },
			},
			{
				$project: {
					_id: false,
					id: '$_id',
					createdAt: true,
					login: true,
					email: true,
				},
			},
		]);

		return userCandidate || null;
	}

	async getAllUsers({
		pageSize,
		pageNumber,
		sortDirection,
		sortBy,
		searchLoginTerm,
		searchEmailTerm,
	}: GetAllUsersSearchParamsDto): Promise<GetAllRepositoryResponse<UserOutputModel>> {
		const skip = this.skipCount({ pageSize, pageNumber });
		const sortDirectionToNumber = sortDirection === SortDirectionEnum.ASC ? 1 : -1;
		const filter = this.prepareGetAllUsersFilter(searchLoginTerm, searchEmailTerm);
		const totalCount = await this.userModel.countDocuments(filter);

		if (!totalCount) {
			return { documents: [], totalCount: 0, pagesCount: 0 };
		}

		const documents = await this.userModel.aggregate<UserOutputModel>([
			{
				$match: filter,
			},
			{
				$sort: { [sortBy]: sortDirectionToNumber },
			},
			{
				$skip: skip,
			},
			{
				$limit: pageSize,
			},
			{
				$project: {
					_id: false,
					id: '$_id',
					createdAt: true,
					login: true,
					email: true,
				},
			},
		]);
		const pagesCount = this.countTotalPages(totalCount, pageSize);

		return { documents, totalCount, pagesCount };
	}

	private prepareGetAllUsersFilter = (login: string | null, email: string | null) => {
		const filterArray = [];
		if (login) {
			filterArray.push({ login: { $regex: login, $options: 'i' } });
		}
		if (email) {
			filterArray.push({ email: { $regex: email, $options: 'i' } });
		}
		return filterArray.length ? { $or: filterArray } : {};
	};
}
