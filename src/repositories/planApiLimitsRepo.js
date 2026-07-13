import { toPlanApiLimitDto } from '../dtos/planApiLimitDto.js';

export const createPlanApiLimitsRepository = (sql) => ({
  findLimit: async (planId, apiProductId) => {
    const rows = await sql`
      SELECT plan_id, api_product_id, monthly_limit
      FROM plan_api_limits
      WHERE plan_id = ${planId} AND api_product_id = ${apiProductId}`;
    return rows[0] ? toPlanApiLimitDto(rows[0]) : null;
  },

  listByPlanId: async (planId) => {
    const rows = await sql`
      SELECT l.plan_id, l.api_product_id, l.monthly_limit,
             p.api_name, p.per_usage_price
      FROM plan_api_limits l
      JOIN api_products p ON p.id = l.api_product_id
      WHERE l.plan_id = ${planId}
      ORDER BY p.api_name`;
    return rows.map(toPlanApiLimitDto);
  },

  listByApiProductId: async (apiProductId) => {
    const rows = await sql`
      SELECT plan_id, api_product_id, monthly_limit
      FROM plan_api_limits
      WHERE api_product_id = ${apiProductId}`;
    return rows.map(toPlanApiLimitDto);
  },
});
