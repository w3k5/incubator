import { Module } from '@nestjs/common';
import { AbstractPasswordService } from './interfaces';
import { PasswordService } from './password.service';

@Module({
	providers: [
		{
			provide: AbstractPasswordService,
			useClass: PasswordService,
		},
	],
	exports: [AbstractPasswordService],
})
export class PasswordModule {}
