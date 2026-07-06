// import postgres from 'postgres';

// console.log('DB URL is:', process.env.DATABASE_URL);

// const sql = postgres(process.env.DATABASE_URL, {
//   ssl: { rejectUnauthorized: false },
// });

// export { sql };

import postgres from 'postgres';

export const createDb = (connectionString = process.env.DATABASE_URL) => {
  return postgres(connectionString, {
    ssl: { rejectUnauthorized: false },
  });
};