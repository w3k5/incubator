import { ObjectId } from 'mongodb';
import { Nullable } from '@app/common/union/nullable';
import { BlogOutputModel } from '@app/modules/blog/types/output-model';
import { GetAllRepositoryResponse } from '@app/common/composite/database/get-all';
import { GetAllBlogsSearchParamsDto } from '@app/modules/blog/dto/get-all-blogs-search-params.dto';

export abstract class AbstractBlogQueryRepository {
	abstract getById: (_id: ObjectId) => Promise<Nullable<BlogOutputModel>>;
	abstract getAll: (params: GetAllBlogsSearchParamsDto) => Promise<GetAllRepositoryResponse<BlogOutputModel>>;
}
