import { Module } from '@nestjs/common';
import { DateService } from './date.service';
import { AbstractDateService } from '@app/services/date-service/abstract.date.service';

@Module({
	providers: [
		{
			provide: AbstractDateService,
			useClass: DateService,
		},
	],
	exports: [AbstractDateService],
})
export class DateServiceModule {}
