export type GetAllRepositoryResponse<Entity> = { documents: Entity[]; totalCount: number; pagesCount: number };

export type GetAllEntities<Entity> = {
	pagesCount: number;
	page: number;
	pageSize: number;
	totalCount: number;
	items: Entity[];
};
