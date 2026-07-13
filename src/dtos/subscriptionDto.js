/**
 * @typedef {Object} SubscriptionDto
 * @property {string} id
 * @property {string} userId
 * @property {string} planId
 * @property {Date} startedAt billing/quota anchor — cycles bill on this date's monthly anniversary
 * @property {Date|null} endedAt null means the subscription is active
 * @property {string} [planName] present when the row was joined with plans
 * @property {string} [pricePerMonth] present when the row was joined with plans
 */

export const toSubscriptionDto = (row) => ({
  id: row.id,
  userId: row.user_id,
  planId: row.plan_id,
  startedAt: row.started_at,
  endedAt: row.ended_at,
  ...(row.plan_name !== undefined && { planName: row.plan_name }),
  ...(row.price_per_month !== undefined && { pricePerMonth: row.price_per_month }),
});
