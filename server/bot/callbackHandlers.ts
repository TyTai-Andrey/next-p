import TelegramBot from "node-telegram-bot-api";
import GameController from "../controllers/Game.controller.js";
import Game from "../models/Game.js";
import User from "../models/User.js";
import keyboard from "./keyboard/index.js";
import bot from "../index.js";
import { combineIntoString } from "../utils/string.js";
import ACTION_TYPE from './keyboard/action.js';

type ICallbackHandlers = {
  chatId: number;
  query: TelegramBot.CallbackQuery
  data: any
}

class CallbackHandlers {
  chatId: number;
  query: TelegramBot.CallbackQuery
  data: any
  constructor({ chatId, query, data }: ICallbackHandlers) {
    this.chatId = chatId;
    this.query = query
    this.data = data
  }

  async _editMessageText(title: string, inline_keyboard: TelegramBot.InlineKeyboardButton[][]) {
    await bot.editMessageText(title, {
      chat_id: this.chatId,
      message_id: this.query.message?.message_id,
      reply_markup: {
        inline_keyboard
      }
    })
  }


  async onInit() {
    await this._editMessageText('Выберите действие:', keyboard.main)
  }

  async onRemoveGame() {
    try {
      const user = await User.findOne({ login: String(this.chatId) });
      if (!user) {
        await this._editMessageText(
          `Пользователь не найден`,
          keyboard.main
        )
      }
      const game = await Game.findOne({ gameId: String(this.data.deleteId) });

      if (!game) {
        await this._editMessageText(
          `Игра не найдена`,
          keyboard.main
        )
        return bot.answerCallbackQuery(this.query.id)
      }
      if (!user) {
        await this._editMessageText(
          `Пользователь не найден`,
          keyboard.main
        )
        return bot.answerCallbackQuery(this.query.id)
      }
      await User.updateOne({ _id: user._id }, { $pullAll: { games: [{ _id: game?._id }] } }, { new: true });

      const result = await GameController.getOwnerList(String(this.chatId));
      await this._editMessageText(
        combineIntoString([
          'Игра удалена',
          '-----------',
          'Ваши игры:',
        ]),
        keyboard.games(result)
      )
    } catch (error) {
      console.log(error);
    }
  };

  async onShowOneGame() {
    try {
      const game = await GameController.getOne(this.data.gameId);

      if (!game) {
        await this._editMessageText(
          `Игра не найдена`,
          keyboard.main
        )
        return bot.answerCallbackQuery(this.query.id)
      }

      await bot.editMessageText(
        combineIntoString([
          'Игра:',
          `Название: ${game?.name}`,
          `Рейтинг: ${game?.rating}`,
          `Дата выхода: ${game?.released}`,
          `Ссылка на сайт: [http://localhost:3000/game/${game?.gameId}](http://localhost:3000/game/${game?.gameId})`
        ]),
        {
          chat_id: this.chatId,
          message_id: this.query.message?.message_id,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: keyboard.oneGame(
              {
                prev: ACTION_TYPE.SHOW_MY_GAMES,
                deleteId: game.gameId,
              }
            )
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  async onShowMyGames() {
    try {
      const result = await GameController.getOwnerList(String(this.chatId));

      await this._editMessageText(
        'Ваши игры:',
        keyboard.games(result)
      )
    } catch (error) {
      console.log(error);
    }
  }
}

export default CallbackHandlers