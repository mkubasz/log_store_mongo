const { z } = require('zod');

const querySchema = z.object({
    categories:z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    period: z.enum(['day', 'week', 'month', 'year']).optional(),
    groupByDate: z.enum(['hour', 'day', 'week', 'month', 'year']).default('hour'),
});

module.exports = querySchema;