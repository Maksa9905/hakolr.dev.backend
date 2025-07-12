import { Injectable } from '@nestjs/common';
import { SignJWT, jwtVerify } from 'jose';

@Injectable()
export class AuthService {
  private readonly secret: Uint8Array;

  constructor() {
    const secretKey = process.env.JWT_SECRET || 'default-secret';
    this.secret = new TextEncoder().encode(secretKey);
  }

  validateUser(username: string, password: string): boolean {
    const adminLogin = process.env.ADMIN_LOGIN || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin';

    return username === adminLogin && password === adminPassword;
  }

  async generateToken(username: string): Promise<string> {
    const payload = { username: username, sub: 'admin' };
    const expiresIn = process.env.JWT_EXPIRES_IN || '3h';

    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .sign(this.secret);

    return jwt;
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const { payload } = await jwtVerify(token, this.secret);
      return payload;
    } catch {
      throw new Error('Invalid token');
    }
  }
}
