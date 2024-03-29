const { z, ZodError } = require("zod");

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z.string(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

module.exports = { loginSchema, signUpSchema };
