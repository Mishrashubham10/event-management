export type CreateCategoryDto = {
  name: string;
  parent?: string;
};

export type CategoryResponseDto = {
  id: string;
  name: string;
  parent: string | null;
};

export type CategoryTreeDto = {
  id: string;
  name: string;
  children: CategoryTreeDto[];
};