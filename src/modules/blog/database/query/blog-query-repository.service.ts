import { Injectable } from '@nestjs/common';
import { AbstractBlogQueryRepository } from '@app/modules/blog/database/query/_abstract.blog-query-repository.service';
import { BlogOutputModel } from '@app/modules/blog/types/output-model';
import { GetAllRepositoryResponse } from '@app/common/composite/database/get-all';
import { GetAllBlogsSearchParamsDto } from '@app/modules/blog/dto/get-all-blogs-search-params.dto';
import { Nullable } from '@app/common/union/nullable';
import { ObjectId } from 'mongodb';
import { LogicalBaseRepository } from '@app/common/base-repo/logical-base-repo';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '@app/modules/blog/blog.schema';
import { Model } from 'mongoose';
import { SortDirectionEnum } from '@app/enums/sort-direction.enum';

@Injectable()
export class BlogQueryRepository extends LogicalBaseRepository implements AbstractBlogQueryRepository {
	constructor(@InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>) {
		super();
	}

	async getAll({
		pageNumber,
		pageSize,
		searchNameTerm,
		sortDirection,
		sortBy,
	}: GetAllBlogsSearchParamsDto): Promise<GetAllRepositoryResponse<BlogOutputModel>> {
		const skip = this.skipCount({ pageSize, pageNumber });
		const sortDirectionToNumber = sortDirection === SortDirectionEnum.ASC ? 1 : -1;
		const totalCount = await this.blogModel.countDocuments({
			$or: [{ name: { $regex: searchNameTerm ?? '', $options: 'i' } }],
		});

		if (!totalCount) {
			return { documents: [], totalCount: 0, pagesCount: 0 };
		}

		const documents = await this.blogModel.aggregate<BlogOutputModel>([
			{
				$match: { $or: [{ name: { $regex: searchNameTerm ?? '', $options: 'i' } }] },
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
					name: true,
					youtubeUrl: true,
					createdAt: true,
				},
			},
		]);

		const pagesCount = this.countTotalPages(totalCount, pageSize);

		return { documents, totalCount, pagesCount };
	}

	async getById(_id: ObjectId): Promise<Nullable<BlogOutputModel>> {
		console.log({ _id });
		const [candidate] = await this.blogModel.aggregate([
			{
				$match: { _id },
			},
			{
				$project: {
					_id: false,
					id: '$_id',
					name: true,
					youtubeUrl: true,
					createdAt: true,
				},
			},
		]);
		return candidate || null;
	}
}
