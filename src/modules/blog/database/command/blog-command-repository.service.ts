import { Injectable } from '@nestjs/common';
import { AbstractDateService } from '@app/services/date-service/abstract.date.service';

@Injectable()
export class BlogCommandRepository {
	constructor(private readonly dateService: AbstractDateService) {}
}
