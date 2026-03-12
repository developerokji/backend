const { z } = require('zod');

const createSubCategorySchema = z.object({
  body: z.object({
    name:       z.string().min(1, 'Sub-category name is required'),
    categoryId: z.coerce.number().int().positive('Category ID is required'),
    status:     z.enum(['active', 'inactive']).default('active'),
  }),
});

const updateSubCategorySchema = z.object({
  body: z.object({
    name:       z.string().min(1).optional(),
    categoryId: z.coerce.number().int().positive().optional(),
    status:     z.enum(['active', 'inactive']).optional(),
  }),
});

module.exports = { createSubCategorySchema, updateSubCategorySchema };
