/**
 * @typedef {Object} PaymentDto
 * @property {string} id
 * @property {string} userId
 * @property {string} planId plan snapshot at billing time
 * @property {string} amountPaid numeric comes back as a string to avoid float loss
 * @property {Date} datePaid
 * @property {string} periodStart date of the billing-cycle boundary this payment covers
 */

export const toPaymentDto = (row) => ({
  id: row.id,
  userId: row.user_id,
  planId: row.plan_id,
  amountPaid: row.amount_paid,
  datePaid: row.date_paid,
  periodStart: row.period_start,
});
