import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
	@Prop({
		required: true,
		type: Date,
	})
	createdAt: Date;

	@Prop({
		required: true,
		type: String,
		maxlength: 10,
		minlength: 3,
	})
	login: string;

	@Prop({
		required: true,
		type: String,
	})
	email: string;

	@Prop({
		required: true,
		type: String,
	})
	password: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
