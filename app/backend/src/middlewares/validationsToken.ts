// import { NextFunction, Request, Response } from 'express';

// export default class ValidationLogin {
//   static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
//     const token = req.headers.authorization;

//     if (!token) {
//       return res.status(401).json({ message: 'Token not found' });
//     }

//     const tokenNotExist = token.split(' ')[1];
//     const isValidToken = JWT.verify(tokenNotExist) as JwtPayload;

//     if (!isValidToken) {
//       return res.status(401).json({ message: 'Token must be a valid token' });
//     }
//     next();
//   }
// }
