import { Module } from '@nestjs/common';
import { BlogCommandRepository } from './command/blog-command-repository.service';
import { QueryService } from './query/query.service';
import { DateServiceModule } from '@app/services/date-service/date-service.module';

@Module({
	imports: [DateServiceModule],
	providers: [BlogCommandRepository, QueryService],
})
export class BlogDatabaseModule {}
