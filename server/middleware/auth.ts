import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const authorizationExceptions = ['/login', '/register'];

const needAuth = (req: Request & any, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') return next();
  if (authorizationExceptions.includes(req.path)) return next();

  try {
    const token = req.headers['authorization']?.split(' ')[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({ message: 'Нет авторизации' });
  }
};

export default needAuth