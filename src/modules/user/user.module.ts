import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserDatabaseModule } from './user-database/user-database.module';
import { UserService } from './user.service';
import { PasswordModule } from '@app/services/password/password.module';

@Module({
	imports: [UserDatabaseModule, PasswordModule],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
