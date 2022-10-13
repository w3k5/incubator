import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { BasicUnauthorizedException } from '../exceptions/basic-unauthorized-exception';
import { Response } from 'express';

@Catch(BasicUnauthorizedException)
export class BasicUnauthorizedFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();
		response.status(status).send();
	}
}
