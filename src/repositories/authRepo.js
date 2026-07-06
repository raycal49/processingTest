export const createAuthRepository = (sql) => ({
  findUserCredentials: async (name) => {
    const rows = await sql`SELECT id, role, hash, FROM users WHERE username = ${name}`;
    return rows[0];
  },
  insertUser: async (user) => {
    const rows = await sql`INSERT INTO users (role, username, hash, email)
                           VALUES (${user.role}, ${user.name}, ${user.hash}, ${user.email})`;
    return rows[0];
  },
  checkUserExists: async (newUser) => {
    const rows = await sql`SELECT EXISTS (SELECT 1 FROM users WHERE username = ${username})`;

    return rows[0];
  },
  insertUser: async (role, username, hash, email) => {
    try {
      const rows = await sql`
        INSERT INTO users (role, username, hash, email)
        VALUES (${role}, ${username}, ${hash}, ${email})
        RETURNING id, role'`

        return rows[0];
    } catch (err) {
      if (err.code === '23505')
        throw new AccountAlreadyExistsError("Account with this username already exists");
    }
  }
});
