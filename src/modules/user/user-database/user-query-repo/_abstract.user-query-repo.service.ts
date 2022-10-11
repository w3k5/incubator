import { ObjectId } from 'mongodb';
import { Nullable } from '@app/common/union/nullable';
import { UserOutputModel } from '@app/modules/user/types/output-model';
import { GetAllRepositoryResponse } from '@app/common/composite/database/get-all';
import { GetAllUsersSearchParamsDto } from '@app/modules/user/dto/get-all-users-params.dto';

export abstract class AbstractUserQueryRepository {
	abstract getUserById: (_id: ObjectId) => Promise<Nullable<UserOutputModel>>;
	abstract getAllUsers: (searchParams: GetAllUsersSearchParamsDto) => Promise<GetAllRepositoryResponse<UserOutputModel>>;
}
