// vendor imports
import axios, { AxiosRequestConfig } from "axios";

export const getClientAxios = axios.create({ headers: { Accept: "application/json" } });

export default class BaseApi {
  static getClient() {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_MAIN_BASE_URL,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  static getClientGames() {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_GAME_BASE_URL,
      headers: { Accept: "application/json" },
      params: { key: process.env.NEXT_PUBLIC_API_GAME_KEY },
    });
  }

  static async getList<T>(options: AxiosRequestConfig = {}): Promise<ITypeOrError<T>> {
    const client = BaseApi.getClientGames();
    try {
      const response = await client(options);
      return response.data;
    } catch (error) {
      return { error };
    }
  }
}
