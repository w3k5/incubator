import { BlogBaseModel } from '@app/modules/blog/types/base-model';

export interface BlogOutputModel extends BlogBaseModel {
	id: string;
	createdAt: Date;
}
