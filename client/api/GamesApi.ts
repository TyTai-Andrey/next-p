// local imports
// api
import BaseApi from "@api/BaseApi";

interface IShortGameInfo {
  name: string
  rating: string
  released: string
}

export default class GamesApi {
  static async getList(params: IGamesListRequest): Promise<ITypeOrError<IListResult<Game>>> {
    const client = BaseApi.getClientGames();
    const options = {
      method: "GET",
      params,
      url: "/games",
    };

    try {
      const response = await client(options);
      return response.data;
    } catch (error) {
      return { error };
    }
  }

  static async getGameById(id: string): Promise<ITypeOrError<GameDetails>> {
    const client = BaseApi.getClientGames();
    const options = {
      method: "GET",
      url: `/games/${id}`,
    };

    try {
      const response = await client(options);
      return response.data;
    } catch (error) {
      return { error };
    }
  }

  static async addGameById(id: string, data: IShortGameInfo): Promise<ITypeOrError<IShortGameInfo>> {
    const client = BaseApi.getClient();
    const options = {
      data,
      method: "POST",
      url: `/add_game/${id}`,
    };

    try {
      const response = await client(options);
      return response.data;
    } catch (error) {
      return { error };
    }
  }

  static async removeGameById(id: string): Promise<ITypeOrError<{ result: IShortGameInfo[] }>> {
    const client = BaseApi.getClient();
    const options = {
      method: "DELETE",
      url: `/remove_game/${id}`,
    };

    try {
      const response = await client(options);
      return response.data;
    } catch (error) {
      return { error };
    }
  }

  static async isGameAdded(id: string): Promise<ITypeOrError<{ result: boolean }>> {
    const client = BaseApi.getClient();
    const options = {
      method: "GET",
      url: `/is_game_added/${id}`,
    };

    try {
      const response = await client(options);
      return response.data;
    } catch (error) {
      return { error };
    }
  }

  static async getScreenshotsGameById(id: string): Promise<ITypeOrError<IListResult<Screenshot>>> {
    const client = BaseApi.getClientGames();
    const options = {
      method: "GET",
      url: `/games/${id}/screenshots`,
    };

    try {
      const response = await client(options);

      return response.data;
    } catch (error) {
      return { error };
    }
  }
}
