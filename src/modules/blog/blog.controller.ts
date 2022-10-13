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
	Put,
	Query,
	UseGuards,
	UsePipes,
} from '@nestjs/common';
import { AbstractBlogQueryRepository } from '@app/modules/blog/database/query/_abstract.blog-query-repository.service';
import { AbstractBlogService } from '@app/modules/blog/abstract/_abstract.blog.service';
import { GetAllBlogsSearchParamsDto } from '@app/modules/blog/dto/get-all-blogs-search-params.dto';
import { GetAllEntities } from '@app/common/composite/database/get-all';
import { BlogOutputModel } from '@app/modules/blog/types/output-model';
import { ObjectIdValidationPipe } from '@app/pipes/objectId.validator.pipe';
import { ObjectId } from 'mongodb';
import { CreateBlogDto } from '@app/modules/blog/dto/create-blog.dto';
import { UpdateBlogDto } from '@app/modules/blog/dto/update-blog.dto';
import { BasicAuthGuard } from '@app/guards/basic-auth.guard';

@Controller('blogs')
export class BlogController {
	constructor(
		private readonly blogsQueryRepository: AbstractBlogQueryRepository,
		private readonly blogsService: AbstractBlogService,
	) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAllBlogs(@Query() searchParams: GetAllBlogsSearchParamsDto): Promise<GetAllEntities<BlogOutputModel>> {
		const { documents, totalCount, pagesCount } = await this.blogsQueryRepository.getAll(searchParams);
		return {
			pageSize: searchParams.pageSize,
			pagesCount,
			totalCount,
			page: searchParams.pageNumber,
			items: documents,
		};
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ObjectIdValidationPipe())
	async getBlogById(@Param('id') id: ObjectId) {
		const blogCandidate = await this.blogsQueryRepository.getById(id);
		if (!blogCandidate) {
			throw new NotFoundException();
		}
		return blogCandidate;
	}

	@Post()
	@UseGuards(BasicAuthGuard)
	@HttpCode(HttpStatus.CREATED)
	async createBlog(@Body() createBlogDto: CreateBlogDto) {
		const id = await this.blogsService.create(createBlogDto);
		console.log(typeof id);
		return this.getBlogById(id);
	}

	@Put(':id')
	@UseGuards(BasicAuthGuard)
	@HttpCode(HttpStatus.NO_CONTENT)
	@UsePipes(new ObjectIdValidationPipe())
	async updateBlogById(@Body() updateBlogDto: UpdateBlogDto, @Param('id') id: ObjectId) {
		const updateResult = await this.blogsService.update(id, updateBlogDto);
		if (!updateResult) {
			throw new NotFoundException();
		}
		return;
	}

	@Delete(':id')
	@UseGuards(BasicAuthGuard)
	@HttpCode(HttpStatus.NO_CONTENT)
	@UsePipes(new ObjectIdValidationPipe())
	async deleteBlogById(@Param('id') id: ObjectId) {
		const deleteResult = await this.blogsService.delete(id);
		if (!deleteResult) {
			throw new NotFoundException();
		}
		return;
	}
}
