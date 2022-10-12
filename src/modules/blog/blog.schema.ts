import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Blog {
	@Prop({
		required: true,
		type: Date,
	})
	createdAt: Date;

	@Prop({
		required: true,
		type: String,
		maxlength: 100,
		match: new RegExp(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/),
	})
	youtubeUrl: string;

	@Prop({
		required: true,
		type: String,
		maxlength: 15,
	})
	name: string;
}
