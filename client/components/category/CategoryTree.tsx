'use client';

import { CreateCategoryDialog } from './CreateCategoryDialog';
import { CategoryNode } from './CategoryNode';
import { useGetCategoryTreeQuery } from '@/redux/api/categoryApi';

export function CategoryTree() {
  const { data, isLoading, isError } = useGetCategoryTreeQuery();

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  if (isError) {
    return <p>Failed to load categories.</p>;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>

        <CreateCategoryDialog />
      </div>

      <div className="space-y-2">
        {data?.data.map((category) => (
          <CategoryNode key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}