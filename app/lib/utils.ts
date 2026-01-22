import bcrypt from 'bcryptjs';

export async function hashPassword(password: any) {
    const saltRounds = 10;  // The number of rounds for generating salt
    const hashedPassword = bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
  