import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationDto } from '@app/dtos/pagination.dto';
import { SortDto } from '@app/dtos/sort.dto';
import { IsOptional, IsString } from 'class-validator';

export class GetAllBlogsSearchParamsDto extends IntersectionType(PaginationDto, SortDto) {
	@IsOptional()
	@IsString()
	searchNameTerm: string | null = null;
}
