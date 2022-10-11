import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './config/configuration';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService, private readonly config: ConfigService<Configuration>) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
}
