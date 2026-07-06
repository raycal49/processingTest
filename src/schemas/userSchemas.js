import * as z from "zod";

const UserSchema = z.object({
    username: z.string(),
    email: z.email(),
    password: z.password(),
});

// const CreateUserSchemas(user) => ({
//     userSchema: 
// })