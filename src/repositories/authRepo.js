import { ExistingAccountError } from '../errors/authErrors.js';

export const createAuthRepository = (sql) => ({
  findUserCredentials: async (name) => {
    const rows = await sql`SELECT id, role, hash, FROM users WHERE username = ${name}`;
    return rows[0];
  },
  checkUserExists: async (name) => {
    const rows = await sql`SELECT EXISTS (
    SELECT 1 FROM users WHERE username = ${name}
    )
    AS userExists`;

    return rows[0].userExists;
  },
  insertUser: async (role, username, hash, email) => {
    try {
      const rows = await sql`
        INSERT INTO users (role, username, hash, email)
        VALUES (${role}, ${username}, ${hash}, ${email})
        RETURNING id, role
        `

        return rows[0];
    } catch (err) {
      console.log("error's code is: " + err.code);
      if (err.code === '23505')
        throw new ExistingAccountError("Account with this username already exists");
      else
        throw err;
    }
  }
});
