import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogDatabaseModule } from './database/blog-database.module';
import { AbstractBlogService } from '@app/modules/blog/abstract/_abstract.blog.service';

@Module({
	providers: [
		{
			provide: AbstractBlogService,
			useClass: BlogService,
		},
	],
	controllers: [BlogController],
	imports: [BlogDatabaseModule],
})
export class BlogModule {}
