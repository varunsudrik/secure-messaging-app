const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const authCookie = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(StatusCodes.FORBIDDEN).json({
      status: "forbidden",
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, `${process.env.JWT_Token}`);

    //  console.log(decoded, 'decoded');

    if (decoded.userId) {
      console.log("Valid user Cookie");
      next();
      return;
    }
  } catch (error) {
    console.error("Error verifying JWT token:", error);
  }

  return res.status(StatusCodes.FORBIDDEN).json({
    status: "forbidden",
    message: "Invalid or expired token",
  });
};

module.exports = { authCookie };
