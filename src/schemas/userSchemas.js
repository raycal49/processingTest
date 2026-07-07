import * as z from "zod";

// export const CreateUserSchema = (user) => ({
//     accountSchema: (user) => {
//         const userSchema = z.object({
//             username: z.string(),
//             email: z.email(),
//             password: z.string(),
//         })

//         try {
//             const result = userSchema.parse(user)
//         } catch (error) {
//             throw new ValidationError(`${error.path}`);
//         }

//         return result.data;
//     },
// });

export const registerSchema = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .trim()
      .min(3, 'Username must be at least 3 characters')
      .max(30, 'Username must be at most 30 characters')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Username may only contain letters, numbers, and underscores'
      ),

    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .toLowerCase()
      .email('Invalid email address')
      .max(18, 'Email is too long'),

    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters')
      .max(15, 'Password must be at most 15 characters') // bcrypt truncates past 72 bytes
      .regex(/[a-z]/, 'Password must contain a lowercase letter')
      .regex(/[A-Z]/, 'Password must contain an uppercase letter')
      .regex(/[0-9]/, 'Password must contain a number'),
  })
  .strict(); // reject unexpected keys instead of silently stripping them
