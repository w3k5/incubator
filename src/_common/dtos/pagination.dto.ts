import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
	@IsOptional()
	@IsInt()
	@Type(() => Number)
	@Min(1)
	pageSize = 10;

	@IsOptional()
	@IsInt()
	@Type(() => Number)
	@Min(1)
	pageNumber = 1;
}
