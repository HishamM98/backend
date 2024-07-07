import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Forbidden!");
    }

    req.email = decoded.email; // Add decoded user info to request object
    next();
  });
}
