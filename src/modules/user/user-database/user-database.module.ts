import { Module } from '@nestjs/common';
import { UserQueryRepository } from './user-query-repo/user-query-repository.service';
import { UserCommandRepository } from './user-command-repo/user-command-repository.service';
import { AbstractUserCommandRepository } from '@app/modules/user/user-database/user-command-repo/_abstract.user-command-repo.service';
import { DateServiceModule } from '@app/services/date-service/date-service.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@app/modules/user/user.schema';
import { AbstractUserQueryRepository } from '@app/modules/user/user-database/user-query-repo/_abstract.user-query-repo.service';

@Module({
	imports: [
		DateServiceModule,
		MongooseModule.forFeature([
			{
				name: User.name,
				schema: UserSchema,
			},
		]),
	],
	providers: [
		{
			provide: AbstractUserQueryRepository,
			useClass: UserQueryRepository,
		},
		{
			provide: AbstractUserCommandRepository,
			useClass: UserCommandRepository,
		},
	],
	exports: [AbstractUserQueryRepository, AbstractUserCommandRepository],
})
export class UserDatabaseModule {}
