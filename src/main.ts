import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT || 3000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
		}),
	);
	await app.listen(port);
}
bootstrap()
	.then(() => console.log(`App has been started at port ${port}`))
	.catch((error) => {
		console.error(error);
	});
