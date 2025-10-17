import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "ljhlfjdghjdfgdjgfhfdjkn13213213";

interface Payload {
  name: string;
  email: string;
  role_id: number;
}

export const Token = (payload: Payload): string => {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

export const verify_token = (token: string): Payload => {
  return jwt.verify(token, SECRET) as Payload;
};
