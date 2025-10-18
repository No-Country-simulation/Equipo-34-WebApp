import bcrypt from "bcrypt";
const rounds = 10;

export const hash_password = (password: string) => {
  return bcrypt.hash(password, rounds);
};

export const compare_password = (
  password: string,
  encrypted_password: string
) => {
  return bcrypt.compare(password, encrypted_password);
};
