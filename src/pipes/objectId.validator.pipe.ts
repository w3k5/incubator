import { ArgumentMetadata, BadRequestException, PipeTransform, ValidationError } from '@nestjs/common';
import { ObjectId } from 'mongodb';

export class ObjectIdValidationPipe implements PipeTransform {
	transform(value: any, meta: ArgumentMetadata): ObjectId {
		if (meta.type === 'param') {
			if (ObjectId.isValid(value)) {
				return new ObjectId(value);
			}
			const error: Partial<ValidationError> = {
				property: 'id',
				constraints: { id: 'ID must be valid ObjectID' },
			};
			throw new BadRequestException(error);
		}
		return value;
	}
}
