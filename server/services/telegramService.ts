import TelegramBot from 'node-telegram-bot-api';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import settingService from './settingService.js';
import config from '../config/config.js';
import User from '../models/User.js';
import { combineIntoString } from '../utils/string.js';

class TelegramService {
  token: string;
  bot: TelegramBot;
  chatId: number | undefined;

  constructor() {
    this.token = config.bot.token;
    this.bot = new TelegramBot(this.token, { polling: false });
  }

  async createUser(chatId: number) {
    const candidate = await User.findOne({ login: chatId });

    if (candidate)
      return combineIntoString(['С возвращение', `Ваш логин: ${chatId}`]);

    const user = new User({ login: chatId });
    await user.save();

    return combineIntoString(['Регистрация успешна', `Ваш логин: ${chatId}`]);
  }
}

export default new TelegramService();
