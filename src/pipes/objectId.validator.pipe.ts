import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';

export class ObjectIdValidationPipe implements PipeTransform {
	transform(value: any, meta: ArgumentMetadata): ObjectId {
		if (meta.type === 'param') {
			if (ObjectId.isValid(value)) {
				return new ObjectId(value);
			}
			throw new BadRequestException();
		}
		return value;
	}
}
