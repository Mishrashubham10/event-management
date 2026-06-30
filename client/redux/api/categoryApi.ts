import { apiSlice } from './apiSlice';

export interface CategoryNode {
  id: string;
  name: string;
  children: CategoryNode[];
}

export interface CreateCategoryRequest {
  name: string;
  parent: string | null;
}

export interface CreateCategoryResponse {
  statusCode: number;
  data: {
    id: string;
    name: string;
    parent: string | null;
  };
  message: string;
}

export interface CategoryTreeResponse {
  statusCode: number;
  data: CategoryNode[];
  message: string;
}

export const flattenCategories = (
  categories: CategoryNode[],
  level = 0,
): Array<{
  id: string;
  name: string;
}> => {
  return categories.flatMap((category) => [
    {
      id: category.id,
      name: `${'— '.repeat(level)}${category.name}`,
    },

    ...flattenCategories(category.children, level + 1),
  ]);
};

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryTree: builder.query<CategoryTreeResponse, void>({
      query: () => '/categories/tree',

      providesTags: ['Category'],
    }),

    createCategory: builder.mutation<
      CreateCategoryResponse,
      CreateCategoryRequest
    >({
      query: (body) => ({
        url: '/categories',

        method: 'POST',

        body,
      }),

      invalidatesTags: ['Category'],
    }),
  }),
});

export const { useGetCategoryTreeQuery, useCreateCategoryMutation } =
  categoryApi;