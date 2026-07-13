/**
 * @typedef {Object} ApiUsageLogDto
 * @property {string} id
 * @property {string} userId
 * @property {string} apiProductId
 * @property {Date} usedAt
 */

export const toApiUsageLogDto = (row) => ({
  id: row.id,
  userId: row.user_id,
  apiProductId: row.api_product_id,
  usedAt: row.used_at,
});

/**
 * @typedef {Object} ApiUsageSummaryDto
 * @property {string} apiProductId
 * @property {string} apiName
 * @property {number} usageCount calls made since the period start
 * @property {number|null} monthlyLimit null when the plan has no limit row for this product
 */

export const toApiUsageSummaryDto = (row) => ({
  apiProductId: row.api_product_id,
  apiName: row.api_name,
  usageCount: Number(row.usage_count),
  monthlyLimit: row.monthly_limit,
});
