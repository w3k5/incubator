import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setAppConfiguration } from './config/app-configuration';

const port = process.env.PORT || 3000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	setAppConfiguration(app);
	await app.listen(port);
}
bootstrap()
	.then(() => console.log(`App has been started at port ${port}`))
	.catch((error) => {
		console.error(error);
	});
