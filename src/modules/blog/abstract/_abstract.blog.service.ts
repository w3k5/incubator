import { UpdateBlogDto } from '@app/modules/blog/dto/update-blog.dto';
import { ObjectId } from 'mongodb';
import { CreateBlogDto } from '@app/modules/blog/dto/create-blog.dto';

export abstract class AbstractBlogService {
	abstract create: (createBlogDto: CreateBlogDto) => Promise<ObjectId>;
	abstract update: (id: ObjectId, updateBlogDto: UpdateBlogDto) => Promise<boolean>;
	abstract delete: (id: ObjectId) => Promise<boolean>;
	abstract drop: () => Promise<void>;
}
