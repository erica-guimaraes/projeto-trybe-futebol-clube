import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import JWT from '../utils/JWT';

export default class ValidationLogin {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailRegex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const tokenNotExist = token.split(' ')[1];
    const isValidToken = JWT.verify(tokenNotExist) as JwtPayload;

    if (!isValidToken) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
