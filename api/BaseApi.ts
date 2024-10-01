import axios, { AxiosRequestConfig } from "axios";

export const getClientAxios = axios.create({ headers: { Accept: "application/json" } });

export default class BaseApi {
  static getClient() {
    return axios.create({
      baseURL: "https://api.rawg.io/api",
      headers: { Accept: "application/json" },
      params: { key: "7dcb6f1da7f74a5786b46a791a0965ca" },
    });
  }

  static async getList<T>(options: AxiosRequestConfig = {}): Promise<T | { error: unknown }> {
    const client = BaseApi.getClient();
    try {
      const response = await client(options);
      return response.data;
    } catch (error) {
      return { error };
    }
  }
}
