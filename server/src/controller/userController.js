const { StatusCodes } = require("http-status-codes");
const { signUpSchema, loginSchema } = require("../interfaces/userInterfaces");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function registerUser(req, res) {
  try {
    // Validate request body
    const parsed = signUpSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(StatusCodes.FORBIDDEN).json({
        status: "failed",
        data: "Invalid payload",
      });
    }

    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to register user" });
  }
}
const loginUser = async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ status: "error", message: "Invalid Payload" });
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ status: "error", message: "Invalid Email/Password" });
    }
    // console.log("User=>", user);

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ status: "error", message: "Invalid Email/Password" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      `${process.env.JWT_Token}`,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      maxAge: 86400000,
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(StatusCodes.OK).json({ status: "success" });
  } catch (error) {
    console.error("Error logging in:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: "error", message: "Error logging in" });
  }
};

module.exports = { registerUser, loginUser };
