import * as jwt from 'jsonwebtoken';

export type TokenPayload = {
  id: number,
  email: string,
};

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class TokenJwt {
  static create(payload: TokenPayload): string {
    const token = jwt.sign(payload, secret);
    return token;
  }

  static verify(authorization: string): TokenPayload {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, secret) as TokenPayload;
    return decoded;
  }
}
