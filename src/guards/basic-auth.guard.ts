import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BasicUnauthorizedException } from '../error/exceptions/basic-unauthorized-exception';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { EnvConfiguration } from '../config/env-configuration';

@Injectable()
export class BasicAuthGuard implements CanActivate {
	constructor(private readonly config: ConfigService<EnvConfiguration>) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest<Request>();

		if (!request.headers || typeof request.headers === 'undefined') throw new BasicUnauthorizedException();

		const authorization = request.header('authorization');

		if (!authorization) throw new BasicUnauthorizedException();

		const [authorizationName, hashedPassword] = authorization.split(' ');

		if (authorizationName !== 'Basic' || !hashedPassword) throw new BasicUnauthorizedException();

		const [login, password] = Buffer.from(hashedPassword, 'base64').toString('ascii').split(':');

		const { login: adminLogin, password: adminPassword } = this.config.get('mock', { infer: true });

		if (login === adminLogin && password === adminPassword) return true;

		throw new BasicUnauthorizedException();
	}
}
