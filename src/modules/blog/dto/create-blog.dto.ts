import { BlogBaseModel } from '@app/modules/blog/types/base-model';
import { IsString, IsUrl, Length } from 'class-validator';

export class CreateBlogDto implements BlogBaseModel {
	@IsString()
	@Length(1, 15)
	name: string;

	@IsUrl({
		require_protocol: true,
		protocols: ['https'],
	})
	@Length(1, 100)
	youtubeUrl: string;
}
