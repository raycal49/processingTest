import { toApiProductDto } from '../dtos/apiProductDto.js';

export const createApiProductsRepository = (sql) => ({
  findById: async (id) => {
    const rows = await sql`
      SELECT id, api_name, per_usage_price
      FROM api_products
      WHERE id = ${id}`;
    return rows[0] ? toApiProductDto(rows[0]) : null;
  },

  findByName: async (apiName) => {
    const rows = await sql`
      SELECT id, api_name, per_usage_price
      FROM api_products
      WHERE api_name = ${apiName}`;
    return rows[0] ? toApiProductDto(rows[0]) : null;
  },

  listAll: async () => {
    const rows = await sql`
      SELECT id, api_name, per_usage_price
      FROM api_products
      ORDER BY api_name`;
    return rows.map(toApiProductDto);
  },
});
