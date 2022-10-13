import { Injectable } from '@nestjs/common';
import { AbstractDateService } from '@app/services/date-service/abstract.date.service';
import { AbstractBlogCommandRepository } from '@app/modules/blog/database/command/_abstract.blog-command-repository.service';
import { CreateBlogDto } from '@app/modules/blog/dto/create-blog.dto';
import { ObjectId } from 'mongodb';
import { UpdateBlogDto } from '@app/modules/blog/dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '@app/modules/blog/blog.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogCommandRepository implements AbstractBlogCommandRepository {
	constructor(
		private readonly dateService: AbstractDateService,
		@InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
	) {}

	async create({ name, youtubeUrl }: CreateBlogDto): Promise<ObjectId> {
		const createdAt = this.dateService.now();
		const createResult = await this.blogModel.create({ name, youtubeUrl, createdAt });
		return createResult._id;
	}

	async delete(_id: ObjectId): Promise<boolean> {
		const deleteResult = await this.blogModel.deleteOne({ _id });
		return !!deleteResult.deletedCount;
	}

	async drop(): Promise<void> {
		await this.blogModel.deleteMany({});
	}

	async updateById(_id: ObjectId, { name, youtubeUrl }: UpdateBlogDto): Promise<boolean> {
		const updateResult = await this.blogModel.updateOne({ _id }, { name, youtubeUrl });
		return !!updateResult.modifiedCount;
	}
}
