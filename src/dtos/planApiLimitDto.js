/**
 * @typedef {Object} PlanApiLimitDto
 * @property {string} planId
 * @property {string} apiProductId
 * @property {number} monthlyLimit
 * @property {string} [apiName] present when the row was joined with api_products
 * @property {string} [perUsagePrice] present when the row was joined with api_products
 */

export const toPlanApiLimitDto = (row) => ({
  planId: row.plan_id,
  apiProductId: row.api_product_id,
  monthlyLimit: row.monthly_limit,
  ...(row.api_name !== undefined && { apiName: row.api_name }),
  ...(row.per_usage_price !== undefined && { perUsagePrice: row.per_usage_price }),
});
