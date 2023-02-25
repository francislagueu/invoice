import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
export const IsAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header('Authorization');
    if (!token) {
      return res.status(403).send({ message: 'Access denied!!' });
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimStart();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(verified);
    req.user = verified;
    next();
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
