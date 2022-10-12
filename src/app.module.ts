import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loadEnv } from './config/configuration';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DateServiceModule } from './services/date-service/date-service.module';
import { BlogModule } from './modules/blog/blog.module';

@Module({
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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
