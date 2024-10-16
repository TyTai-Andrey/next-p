import TelegramBot from 'node-telegram-bot-api';
import keyboard from './keyboard/index.js';
import tgService from '../services/telegramService.js';
import ACTION_TYPE from './keyboard/action.js';
import bot from '../index.js';
import CallbackHandlers from './callbackHandlers.js';

const onStart = async (msg: TelegramBot.Message) => {
  const { chat: { id: chatId } } = msg;
  try {
    const result = await tgService.createUser(chatId)

    await bot.sendMessage(chatId, result);
    await bot.sendMessage(chatId, 'Выберите действие:', {
      reply_markup: {
        inline_keyboard: keyboard.main
      }
    })
  } catch (error) {
    console.log(error);

    bot.sendMessage(chatId, 'Произошла ошибка при регистрации. Попробуйте позже');
  }
}

const onCallbackQuery = async (query: TelegramBot.CallbackQuery) => {
  const chatId = query.from.id;
  let data: any;

  try {
    data = JSON.parse(query.data!)
  } catch (error) {
    console.log(error);
  }
  const { type } = data

  const callbackHandlers = new CallbackHandlers({ chatId, query, data });

  switch (type) {
    case ACTION_TYPE.INIT:
      callbackHandlers.onInit()
      break;
    case ACTION_TYPE.REMOVE_GAME:
      callbackHandlers.onRemoveGame()
      break;
    case ACTION_TYPE.SHOW_ONE_GAME:
      callbackHandlers.onShowOneGame()
      break
    case ACTION_TYPE.SHOW_MY_GAMES:
      callbackHandlers.onShowMyGames()
    default:
      break
  }
  return bot.answerCallbackQuery(query.id)
}

const useBotHandlers = (bot: TelegramBot) => {
  bot.onText(/\/start/, onStart);
  bot.on('callback_query', onCallbackQuery);
}

export { onStart, onCallbackQuery, useBotHandlers }