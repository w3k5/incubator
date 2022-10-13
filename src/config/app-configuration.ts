import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import { generateError } from '../error/generator';
import { BadRequestExceptionFilter } from '../error/filters/bad-request.filter';
import { NotFoundFilter } from '../error/filters/not-found.filter';
import { BasicUnauthorizedFilter } from '../error/filters/basic-unauthorized.filter';

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
	const globalFiltersSettings = [new BadRequestExceptionFilter(), new NotFoundFilter(), new BasicUnauthorizedFilter()];

	app.useGlobalFilters(...globalFiltersSettings);
	app.useGlobalPipes(globalPipesSettings);
};
