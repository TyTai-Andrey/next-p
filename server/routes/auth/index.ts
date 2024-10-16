import { Router } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import config from "../../config/config.js";
import UserController from "../../controllers/User.controller.js";

const router = Router();

router.post('/register',
  check('login', 'Некорректный логин').isEmail(),
  check('password', 'Минимальная длина пароля 6 символов').isLength({
    min: 6,
  }),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при регистрации',
        });
      }

      const { login, password } = req.body;

      const result = await UserController.create({ login, password });

      if (result.error) {
        return res
          .status(400)
          .json({ message: result.error });
      }

      res.status(201).json({ message: 'Пользователь создан' });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.post('/login',
  check('login', 'Введите логин').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при входе в систему',
        });
      }
      const { login } = req.body;
      const user = await UserController.getOne(login);
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' });
      }

      const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
        expiresIn: '1h',
      });

      await User.findOneAndUpdate({ _id: user.id }, { token });

      res.json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

export default router;