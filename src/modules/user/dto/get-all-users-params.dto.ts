import { IntersectionType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@app/dtos/pagination.dto';
import { SortDto } from '@app/dtos/sort.dto';

export class GetAllUsersSearchParamsDto extends IntersectionType(PaginationDto, SortDto) {
	@IsOptional()
	@IsString()
	searchLoginTerm: string | null = null;

	@IsOptional()
	@IsString()
	searchEmailTerm: string | null = null;
}
