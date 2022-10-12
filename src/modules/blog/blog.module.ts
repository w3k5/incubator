import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogDatabaseModule } from './database/blog-database.module';

@Module({
	providers: [BlogService],
	controllers: [BlogController],
	imports: [BlogDatabaseModule],
})
export class BlogModule {}
