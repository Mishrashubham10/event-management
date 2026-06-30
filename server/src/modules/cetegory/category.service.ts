import { Types } from 'mongoose';

import { HTTP_STATUS } from '../../constrants/http-status';
import { ApiError } from '../../utils/ApiError';
import { Category, CategoryDocument } from './category.model';
import {
  CategoryResponseDto,
  CategoryTreeDto,
  CreateCategoryDto,
} from './category.types';

// FIND PARENT HELPER
const findParent = async (
  parentId?: string,
): Promise<CategoryDocument | null> => {
  if (!parentId) {
    return null;
  }

  const parent = await Category.findById(parentId);

  if (!parent) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Parent category not found.');
  }

  return parent;
};

// CHECK DUPLICATE HELPER
const checkDuplicate = async (name: string, parent: Types.ObjectId | null) => {
  const category = await Category.findOne({
    name,
    parent,
  });

  if (category) {
    throw new ApiError(HTTP_STATUS.CONFLICT, 'Category already exists.');
  }
};

// MAP CATEGORY HELPER
const mapCategory = (category: CategoryDocument): CategoryResponseDto => ({
  id: category._id.toString(),
  name: category.name,
  parent: category.parent?.toString() ?? null,
});

// CREATE CATEGORY SERVICE
export const createCategoryService = async (
  dto: CreateCategoryDto,
): Promise<CategoryResponseDto> => {
  const parent = await findParent(dto.parent);

  await checkDuplicate(dto.name, parent?._id ?? null);

  const category = await Category.create({
    name: dto.name.trim(),
    parent: parent?._id ?? null,
  });

  return mapCategory(category);
};

// GET CATEGORIES SERVICE
export const categoriesService = async (): Promise<CategoryResponseDto[]> => {
  const categories = await Category.find().sort({ createdAt: 1 });

  return categories.map(mapCategory);
};

// CATEGORY TREE SERVICE
export const getCategoryTreeService = async (): Promise<CategoryTreeDto[]> => {
  const categories = await Category.find().sort({ createdAt: 1 }).lean();

  const categoryMap = new Map<string, CategoryTreeDto>();

  const roots: CategoryTreeDto[] = [];

  // CREATE ALL NODES
  for (const category of categories) {
    categoryMap.set(category._id.toString(), {
      id: category._id.toString(),
      name: category.name,
      children: [],
    });
  }

  // CONNECT PARENT - CHILD
  for (const category of categories) {
    const node = categoryMap.get(category._id.toString())!;

    if (!category.parent) {
      roots.push(node);
      continue;
    }

    const parent = categoryMap.get(category.parent.toString());

    parent?.children.push(node);
  }

  return roots;
};