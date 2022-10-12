import { ErrorInterface, ErrorMessageInterface } from './interface';

export const generateError = ({ field, message }: ErrorInterface): ErrorInterface => {
	return {
		message,
		field,
	};
};

export const generateErrorMessage = (errors: ErrorInterface[]): ErrorMessageInterface => {
	return {
		errorsMessages: errors,
	};
};
