import { Injectable } from '@nestjs/common';
import { AbstractBlogCommandRepository } from '@app/modules/blog/database/command/_abstract.blog-command-repository.service';
import { ObjectId } from 'mongodb';
import { CreateBlogDto } from '@app/modules/blog/dto/create-blog.dto';
import { UpdateBlogDto } from '@app/modules/blog/dto/update-blog.dto';
import { AbstractBlogService } from '@app/modules/blog/abstract/_abstract.blog.service';

@Injectable()
export class BlogService implements AbstractBlogService {
	constructor(private readonly blogCommandRepository: AbstractBlogCommandRepository) {}

	async create({ name, youtubeUrl }: CreateBlogDto): Promise<ObjectId> {
		return this.blogCommandRepository.create({ name, youtubeUrl });
	}

	async update(id: ObjectId, { name, youtubeUrl }: UpdateBlogDto): Promise<boolean> {
		return this.blogCommandRepository.updateById(id, { name, youtubeUrl });
	}

	async delete(id: ObjectId): Promise<boolean> {
		return this.blogCommandRepository.delete(id);
	}

	async drop(): Promise<void> {
		return this.blogCommandRepository.drop();
	}
}
