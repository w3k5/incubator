import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	BadRequestException,
	ValidationError,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorInterface } from './interface';
import { generateError } from './generator';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();
		const message = ((exception.getResponse() as any).message as ErrorInterface[]) ?? [
			generateError({
				field: (exception.getResponse() as Partial<ValidationError>).property,
				message: Object.values((exception.getResponse() as Partial<ValidationError>).constraints)[0],
			}),
		];
		response.status(status).json({
			errorsMessages: message,
		});
	}
}
