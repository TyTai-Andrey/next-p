import Game from "../models/Game.js";
import User from "../models/User.js";

interface GameDetails {
  name: string;
  rating: string;
  released: string;
  gameId: string;
}

class GameController {
  constructor() { }

  async create(data: GameDetails) {
    let game = await Game.findOne({ gameId: data.gameId });

    if (!game) {
      game = await new Game(data);
      await game.save();
    }

    return game;
  }

  async getOwnerList(ownerId: string) {
    const user = await User.findOne({ login: ownerId });

    if (!user) {
      return [];
    }
    const games = await Game.find({ _id: user.games });

    return games;
  }

  async getOne(id: string) {
    return await Game.findOne({ _id: id });
  }

  async isGameAdded(userId: string, gameId: string) {
    const user = await User.findOne({ _id: userId });
    const game = await Game.findOne({ gameId });

    if (!user || !game) {
      return false;
    }

    return user?.games?.includes(game?._id);
  }
}

export default new GameController();