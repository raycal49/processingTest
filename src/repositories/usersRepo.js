import {
  toUserDto,
  toUserCredentialsDto,
  toUserPaymentProfileDto,
} from '../dtos/userDto.js';

export const createUsersRepository = (sql) => ({
  findById: async (id) => {
    const rows = await sql`
      SELECT id, username, email, plan_id, card_last4, created_at
      FROM users
      WHERE id = ${id}`;
    return rows[0] ? toUserDto(rows[0]) : null;
  },

  findByUsername: async (username) => {
    const rows = await sql`
      SELECT id, username, email, plan_id, card_last4, created_at
      FROM users
      WHERE username = ${username}`;
    return rows[0] ? toUserDto(rows[0]) : null;
  },

  findByEmail: async (email) => {
    const rows = await sql`
      SELECT id, username, email, plan_id, card_last4, created_at
      FROM users
      WHERE email = ${email}`;
    return rows[0] ? toUserDto(rows[0]) : null;
  },

  findCredentialsByUsername: async (username) => {
    const rows = await sql`
      SELECT id, username, password_hash
      FROM users
      WHERE username = ${username}`;
    return rows[0] ? toUserCredentialsDto(rows[0]) : null;
  },

  findPaymentProfileById: async (id) => {
    const rows = await sql`
      SELECT id, payment_token, card_last4
      FROM users
      WHERE id = ${id}`;
    return rows[0] ? toUserPaymentProfileDto(rows[0]) : null;
  },

  listByPlanId: async (planId) => {
    const rows = await sql`
      SELECT id, username, email, plan_id, card_last4, created_at
      FROM users
      WHERE plan_id = ${planId}
      ORDER BY created_at`;
    return rows.map(toUserDto);
  },
});
