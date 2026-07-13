import { toPaymentDto } from '../dtos/paymentDto.js';

export const createPaymentHistoryRepository = (sql) => ({
  findById: async (id) => {
    const rows = await sql`
      SELECT id, user_id, plan_id, amount_paid, date_paid, period_start
      FROM payment_history
      WHERE id = ${id}`;
    return rows[0] ? toPaymentDto(rows[0]) : null;
  },

  // (user_id, period_start) is unique, so a cycle has at most one payment.
  findByUserAndPeriod: async (userId, periodStart) => {
    const rows = await sql`
      SELECT id, user_id, plan_id, amount_paid, date_paid, period_start
      FROM payment_history
      WHERE user_id = ${userId} AND period_start = ${periodStart}`;
    return rows[0] ? toPaymentDto(rows[0]) : null;
  },

  existsForPeriod: async (userId, periodStart) => {
    const rows = await sql`
      SELECT EXISTS (
        SELECT 1 FROM payment_history
        WHERE user_id = ${userId} AND period_start = ${periodStart}
      )`;
    return rows[0].exists;
  },

  findLatestForUser: async (userId) => {
    const rows = await sql`
      SELECT id, user_id, plan_id, amount_paid, date_paid, period_start
      FROM payment_history
      WHERE user_id = ${userId}
      ORDER BY period_start DESC
      LIMIT 1`;
    return rows[0] ? toPaymentDto(rows[0]) : null;
  },

  listByUserId: async (userId) => {
    const rows = await sql`
      SELECT id, user_id, plan_id, amount_paid, date_paid, period_start
      FROM payment_history
      WHERE user_id = ${userId}
      ORDER BY period_start DESC`;
    return rows.map(toPaymentDto);
  },
});
