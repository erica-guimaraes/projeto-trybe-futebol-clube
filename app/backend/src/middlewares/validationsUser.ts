import { NextFunction, Request, Response } from 'express';

export default class ValidationLogin {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailValido = emailRegex.test(email);

    if (!emailValido || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}
