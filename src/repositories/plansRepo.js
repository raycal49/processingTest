import { toPlanDto } from '../dtos/planDto.js';

export const createPlansRepository = (sql) => ({
  findById: async (id) => {
    const rows = await sql`
      SELECT id, plan_name, price_per_month, description, is_active
      FROM plans
      WHERE id = ${id}`;
    return rows[0] ? toPlanDto(rows[0]) : null;
  },

  findByName: async (planName) => {
    const rows = await sql`
      SELECT id, plan_name, price_per_month, description, is_active
      FROM plans
      WHERE plan_name = ${planName}`;
    return rows[0] ? toPlanDto(rows[0]) : null;
  },

  listActive: async () => {
    const rows = await sql`
      SELECT id, plan_name, price_per_month, description, is_active
      FROM plans
      WHERE is_active
      ORDER BY price_per_month`;
    return rows.map(toPlanDto);
  },

  listAll: async () => {
    const rows = await sql`
      SELECT id, plan_name, price_per_month, description, is_active
      FROM plans
      ORDER BY price_per_month`;
    return rows.map(toPlanDto);
  },
});
