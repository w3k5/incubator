import { IsEnum, IsOptional } from 'class-validator';
import { SortDirectionEnum } from '../enums/sort-direction.enum';

export class SortDto {
	@IsOptional()
	sortBy = 'createdAt';

	@IsOptional()
	@IsEnum(SortDirectionEnum)
	sortDirection: SortDirectionEnum = SortDirectionEnum.DESC;
}
