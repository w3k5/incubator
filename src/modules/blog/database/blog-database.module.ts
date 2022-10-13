import { Module, ModuleMetadata } from '@nestjs/common';
import { BlogCommandRepository } from './command/blog-command-repository.service';
import { BlogQueryRepository } from './query/blog-query-repository.service';
import { DateServiceModule } from '@app/services/date-service/date-service.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BLogSchema } from '@app/modules/blog/blog.schema';
import { AbstractBlogCommandRepository } from '@app/modules/blog/database/command/_abstract.blog-command-repository.service';
import { AbstractBlogQueryRepository } from '@app/modules/blog/database/query/_abstract.blog-query-repository.service';

export const blogDatabaseModuleSettings: ModuleMetadata = {
	imports: [
		DateServiceModule,
		MongooseModule.forFeature([
			{
				name: Blog.name,
				schema: BLogSchema,
			},
		]),
	],
	providers: [
		{
			provide: AbstractBlogCommandRepository,
			useClass: BlogCommandRepository,
		},
		{
			provide: AbstractBlogQueryRepository,
			useClass: BlogQueryRepository,
		},
	],
	exports: [AbstractBlogCommandRepository, AbstractBlogQueryRepository],
};

@Module(blogDatabaseModuleSettings)
export class BlogDatabaseModule {}
