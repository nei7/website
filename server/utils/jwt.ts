import jwt from "jsonwebtoken";

export function signToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
}
