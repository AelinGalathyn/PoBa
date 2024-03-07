import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    try {
      // Use argon2 to hash the password. You can customize the options as needed.
      return await argon2.hash(password);
    } catch (err) {
      throw new Error('Password hashing failed');
    }
  }

  async verifyPassword(hash: string, inputPassword: string): Promise<boolean> {
    try {
      // Compare the input password with the hash stored in the database.
      return await argon2.verify(hash, inputPassword);
    } catch (err) {
      throw new Error('Password verification failed');
    }
  }
}
