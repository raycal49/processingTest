import { toSubscriptionDto } from '../dtos/subscriptionDto.js';

export const createSubscriptionsRepository = (sql) => ({
  findById: async (id) => {
    const rows = await sql`
      SELECT id, user_id, plan_id, started_at, ended_at
      FROM subscriptions
      WHERE id = ${id}`;
    return rows[0] ? toSubscriptionDto(rows[0]) : null;
  },

  // The partial unique index (user_id WHERE ended_at IS NULL) guarantees
  // at most one row here.
  findActiveByUserId: async (userId) => {
    const rows = await sql`
      SELECT id, user_id, plan_id, started_at, ended_at
      FROM subscriptions
      WHERE user_id = ${userId} AND ended_at IS NULL`;
    return rows[0] ? toSubscriptionDto(rows[0]) : null;
  },

  findActiveWithPlanByUserId: async (userId) => {
    const rows = await sql`
      SELECT s.id, s.user_id, s.plan_id, s.started_at, s.ended_at,
             p.plan_name, p.price_per_month
      FROM subscriptions s
      JOIN plans p ON p.id = s.plan_id
      WHERE s.user_id = ${userId} AND s.ended_at IS NULL`;
    return rows[0] ? toSubscriptionDto(rows[0]) : null;
  },

  listByUserId: async (userId) => {
    const rows = await sql`
      SELECT id, user_id, plan_id, started_at, ended_at
      FROM subscriptions
      WHERE user_id = ${userId}
      ORDER BY started_at DESC`;
    return rows.map(toSubscriptionDto);
  },
});
