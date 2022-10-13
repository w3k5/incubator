import { AbstractBaseRepository } from '@app/common/base-repo/base-repo.abstract';
import { ObjectId } from 'mongodb';
import { CreateBlogDto } from '@app/modules/blog/dto/create-blog.dto';
import { UpdateBlogDto } from '@app/modules/blog/dto/update-blog.dto';

export abstract class AbstractBlogCommandRepository implements AbstractBaseRepository {
	abstract drop: () => Promise<void>;
	abstract create: (dto: CreateBlogDto) => Promise<ObjectId>;
	abstract updateById: (_id: ObjectId, dto: UpdateBlogDto) => Promise<boolean>;
	abstract delete: (_id: ObjectId) => Promise<boolean>;
}
