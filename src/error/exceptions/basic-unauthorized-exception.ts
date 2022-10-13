import { HttpException, HttpStatus } from '@nestjs/common';

export class BasicUnauthorizedException extends HttpException {
	constructor() {
		super('BasicUnauthorized', HttpStatus.UNAUTHORIZED);
	}
}
