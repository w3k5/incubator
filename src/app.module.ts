import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loadEnv } from './config/env-configuration';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DateServiceModule } from './services/date-service/date-service.module';
import { BlogModule } from './modules/blog/blog.module';
import { AuthModule } from '@app/modules/auth/auth.module';

export const appModuleSettings = {
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [loadEnv],
		}),
		MongooseModule.forRoot(process.env.MONGO_URI, {
			dbName: process.env.DB_NAME,
		}),
		UserModule,
		DateServiceModule,
		BlogModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
};

@Module(appModuleSettings)
export class AppModule {}
