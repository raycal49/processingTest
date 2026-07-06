export const createUserRepository = (sql) => ({
  findById: async (id) => {
    const rows = await sql`SELECT * FROM customer
                           WHERE id = ${id}`;
    return rows[0];
  },
});
