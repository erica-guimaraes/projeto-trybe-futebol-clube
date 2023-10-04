import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

export default class ValidateToken {
  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const validToken = JWT.verify(authorization);

    if (!validToken) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    res.locals.user = validToken;
    next();
  }
}
