/**
 * @typedef {Object} ApiProductDto
 * @property {string} id
 * @property {string} apiName
 * @property {string} perUsagePrice numeric comes back as a string to avoid float loss
 */

export const toApiProductDto = (row) => ({
  id: row.id,
  apiName: row.api_name,
  perUsagePrice: row.per_usage_price,
});
