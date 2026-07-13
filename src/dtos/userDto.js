/**
 * @typedef {Object} UserDto
 * @property {string} id
 * @property {string} username
 * @property {string} email
 * @property {string|null} planId
 * @property {string|null} cardLast4
 * @property {Date} createdAt
 */

/** Safe default shape — never exposes password_hash or payment_token. */
export const toUserDto = (row) => ({
  id: row.id,
  username: row.username,
  email: row.email,
  planId: row.plan_id,
  cardLast4: row.card_last4,
  createdAt: row.created_at,
});

/** For login flows only. */
export const toUserCredentialsDto = (row) => ({
  id: row.id,
  username: row.username,
  passwordHash: row.password_hash,
});

/** For charging flows only. */
export const toUserPaymentProfileDto = (row) => ({
  id: row.id,
  paymentToken: row.payment_token,
  cardLast4: row.card_last4,
});
