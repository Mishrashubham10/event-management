import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { createCategorySchema } from './category.validation';
import {
  categoriesService,
  createCategoryService,
  getCategoryTreeService,
} from './category.service';
import { HTTP_STATUS } from '../../constrants/http-status';
import { ApiResponse } from '../../utils/ApiResponse';

// CREATE CATEGORY CONTROLLER
export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const dto = createCategorySchema.parse(req.body);

    const result = await createCategoryService(dto);

    res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(
          HTTP_STATUS.CREATED,
          result,
          'Category created successfully',
        ),
      );
  },
);

// GET CATEGORIES
export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const result = await categoriesService();

  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        result,
        'Categories fetched successfully.',
      ),
    );
});

// GET CATEGORY TREE
export const getCategoryTree = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await getCategoryTreeService();

    res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          HTTP_STATUS.OK,
          result,
          'Category tree fetched successfully.',
        ),
      );
  },
);