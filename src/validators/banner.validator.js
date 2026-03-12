const { z } = require('zod');

const createBannerSchema = z.object({
  body: z.object({
    bannerTitle:    z.string().min(1, 'Banner title is required'),
    bannerDesc:     z.string().optional(),
    categoryId:     z.coerce.number().int().positive().optional(),
    subCategoryId:  z.coerce.number().int().positive().optional(),
    serviceId:      z.coerce.number().int().positive().optional(),
    status:         z.enum(['on', 'off']).default('on'),
    show:           z.enum(['up', 'down']).default('up'),
  }),
});

const updateBannerSchema = z.object({
  body: z.object({
    bannerTitle:    z.string().min(1).optional(),
    bannerDesc:     z.string().optional(),
    categoryId:     z.coerce.number().int().positive().optional(),
    subCategoryId:  z.coerce.number().int().positive().optional(),
    serviceId:      z.coerce.number().int().positive().optional(),
    status:         z.enum(['on', 'off']).optional(),
    show:           z.enum(['up', 'down']).optional(),
  }),
});

module.exports = { createBannerSchema, updateBannerSchema };
