import { Request, Router } from "express";

import { check, validationResult } from 'express-validator';
import User from "../../models/User.js";
import GameController from "../../controllers/Game.controller.js";
import UserController from "../../controllers/User.controller.js";

const router = Router();

router.post(
  '/add_game/:gameId',
  check('name', 'Отсутствует название').isString(),
  check('rating', 'Отсутствует рейтинг').isString(),
  check('released', 'Отсутствует дата выхода').isString(),
  async (req: Request & any, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные',
        });
      }

      const { name, rating, released } = req.body;

      const game = await GameController.create({
        name,
        rating,
        released,
        gameId: req.params.gameId
      })

      await User.findOneAndUpdate({ _id: req.user.userId }, { $push: { games: game } });

      res.json({ game });
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.delete('/remove_game/:gameId', async (req: Request & any, res) => {
  try {
    const result = await UserController.deleteGame(req.user.userId, req.params.gameId);

    if (result.error) {
      return res.status(404).json({ error: result.error });
    }

    res.json({ result: result?.user });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/show_my_games', async (req: Request & any, res) => {
  try {
    const result = await GameController.getOwnerList(req.user.userId);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/is_game_added/:gameId', async (req: Request & any, res) => {
  try {
    const result = await GameController.isGameAdded(req.user.userId, req.params.gameId);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;