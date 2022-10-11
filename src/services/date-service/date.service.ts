import { Injectable } from '@nestjs/common';
import { AbstractDateService } from '@app/services/date-service/abstract.date.service';

@Injectable()
export class DateService implements AbstractDateService {
	now(): Date {
		return new Date();
	}
}
