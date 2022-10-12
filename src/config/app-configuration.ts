import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import { generateError } from '../error/generator';
import { BadRequestExceptionFilter } from '../error/filter';

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
	const globalFiltersSettings = [new BadRequestExceptionFilter()];

	app.useGlobalFilters(...globalFiltersSettings);
	app.useGlobalPipes(globalPipesSettings);
};
