import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Param,
	Post,
	Query,
	UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import { UserService } from '@app/modules/user/user.service';
import { AbstractUserQueryRepository } from '@app/modules/user/user-database/user-query-repo/_abstract.user-query-repo.service';
import { ObjectId } from 'mongodb';
import { ObjectIdValidationPipe } from '@app/pipes/objectId.validator.pipe';
import { UserOutputModel } from '@app/modules/user/types/output-model';
import { GetAllUsersSearchParamsDto } from '@app/modules/user/dto/get-all-users-params.dto';

@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly userQueryRepository: AbstractUserQueryRepository,
	) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAllUsers(@Query() searchParams: GetAllUsersSearchParamsDto) {
		const { documents, totalCount, pagesCount } = await this.userQueryRepository.getAllUsers(searchParams);
		return {
			totalCount,
			pagesCount,
			pageSize: searchParams.pageSize,
			page: searchParams.pageNumber,
			items: documents,
		};
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ObjectIdValidationPipe())
	async getUserById(@Param('id') id: ObjectId) {
		const candidate = await this.userQueryRepository.getUserById(id);
		if (!candidate) {
			throw new NotFoundException();
		}
		return candidate;
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async createUser(@Body() createUserDto: CreateUserDto): Promise<UserOutputModel> {
		const id = await this.userService.createUser(createUserDto);
		return await this.userQueryRepository.getUserById(id);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@UsePipes(new ObjectIdValidationPipe())
	async deleteUser(@Param('id') id: ObjectId) {
		const isUserDeleted = await this.userService.deleteUser(id);
		if (!isUserDeleted) {
			throw new NotFoundException();
		}
		return;
	}
}
