import bcrypt from "bcryptjs";

import User from "../models/User.js";
import Game from "../models/Game.js";

interface UserDetails {
  login: string;
  password: string;
}

class UserController {
  constructor() { }

  async create(data: UserDetails) {
    const candidate = await this.getOne(data.login);

    if (candidate) {
      return ({ error: 'Такой пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = new User({ login: data.login, password: hashedPassword });
    await user.save();

    return { user }
  }

  async getOne(login: string) {
    return await User.findOne({ login })
  }

  async deleteGame(userId: string, gameId: string) {
    const user = await User.findOne({ id: userId });
    if (!user) {
      return { error: 'Пользователь не найден' };
    }
    const game = await Game.findOne({ gameId });

    if (!game) {
      return { error: 'Игра не найдена' };
    }
    const updatedUser = await User.updateOne({ _id: user._id }, { $pullAll: { games: [{ _id: game?._id }] } }, { new: true });


    return { user: updatedUser }
  }
}

export default new UserController();