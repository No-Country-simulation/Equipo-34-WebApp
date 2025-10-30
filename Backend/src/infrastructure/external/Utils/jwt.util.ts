import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "ljhlfjdghjdfgdjgfhfdjkn13213213";

interface Payload {
  user_id: string;
  name: string;
  email: string;
  role: string;
}

export const Token = (payload: Payload): string => {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

export const verify_token = (token: string): Payload => {
  return jwt.verify(token, SECRET) as Payload;
};
