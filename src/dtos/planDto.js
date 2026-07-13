/**
 * @typedef {Object} PlanDto
 * @property {string} id
 * @property {string} planName
 * @property {string} pricePerMonth numeric comes back as a string to avoid float loss
 * @property {string|null} description
 * @property {boolean} isActive
 */

export const toPlanDto = (row) => ({
  id: row.id,
  planName: row.plan_name,
  pricePerMonth: row.price_per_month,
  description: row.description,
  isActive: row.is_active,
});
