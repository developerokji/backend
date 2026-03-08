const { z } = require('zod');
const createStorySchema = z.object({
  body: z.object({
    imageName: z.string().min(1, 'Image name is required'),
    status: z.enum(['on', 'off']),
  }),
});


module.exports = {
  createStorySchema,
};
