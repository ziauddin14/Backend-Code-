import jwt from "jsonwebtoken";
const secretKey = "123456789abcdef"; // Use env variable in real apps

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).send("Access denied. A token is required for authentication");
  }

  // Token format: "Bearer <token>"
  const token = authHeader.split(" ")[1]; // Split to get actual token
  if (!token) {
    return res.status(403).send("Access denied. Token not found");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

export { verifyToken };
