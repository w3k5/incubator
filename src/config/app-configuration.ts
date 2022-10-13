import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import { generateError } from '../error/generator';
import { BadRequestExceptionFilter } from '../error/bad-request.filter';
import { NotFoundFilter } from '../error/not-found.filter';

export const setAppConfiguration = (app: INestApplication) => {
	const globalPipesSettings = new ValidationPipe({
		whitelist: true,
		transform: true,
		stopAtFirstError: true,
		exceptionFactory: (errors) => {
			const preparedErrors = errors.map((error) => {
				const field = error.property;
				const [message] = Object.values(error.constraints);
				return generateError({ field, message });
			});
			throw new BadRequestException(preparedErrors);
		},
	});
	const globalFiltersSettings = [new BadRequestExceptionFilter(), new NotFoundFilter()];

	app.useGlobalFilters(...globalFiltersSettings);
	app.useGlobalPipes(globalPipesSettings);
};
