'use client';

import { Folder } from 'lucide-react';
import { CategoryNode as Category } from '@/redux/api/categoryApi';

interface Props {
  category: Category;
}

export function CategoryNode({ category }: Props) {
  return (
    <div className="ml-4">
      <div className="flex items-center gap-2 rounded-md py-1">
        <Folder className="h-4 w-4 text-primary" />

        <span>{category.name}</span>
      </div>

      {category.children.length > 0 && (
        <div className="ml-6 border-l pl-4">
          {category.children.map((child) => (
            <CategoryNode key={child.id} category={child} />
          ))}
        </div>
      )}
    </div>
  );
}