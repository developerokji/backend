const { z } = require('zod');

const createCategorySchema = z.object({
  body: z.object({
    name:   z.string().min(1, 'Category name is required'),
    status: z.enum(['active', 'inactive']).default('active'),
  }),
});

const updateCategorySchema = z.object({
  body: z.object({
    name:   z.string().min(1).optional(),
    status: z.enum(['active', 'inactive']).optional(),
  }),
});

module.exports = { createCategorySchema, updateCategorySchema };
