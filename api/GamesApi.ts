import BaseApi from "./BaseApi";

export default class GamesApi {
  static async getList(params: IGamesListRequest): Promise<ITypeOrError<IListResult<Game>>> {
    const client = BaseApi.getClient();
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
    const client = BaseApi.getClient();
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

  static async getScreenshotsGameById(id: string): Promise<ITypeOrError<IListResult<Screenshot>>> {
    const client = BaseApi.getClient();
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
