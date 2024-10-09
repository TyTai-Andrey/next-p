import axios, { AxiosRequestConfig } from "axios";

export const getClientAxios = axios.create({ headers: { Accept: "application/json" } });

export default class BaseApi {
  static getClient() {
    return axios.create({
      baseURL: process.env.API_BASE_URL,
      headers: { Accept: "application/json" },
      params: { key: process.env.API_KEY },
    });
  }

  static async getList<T>(options: AxiosRequestConfig = {}): Promise<ITypeOrError<T>> {
    const client = BaseApi.getClient();
    try {
      const response = await client(options);
      return response.data;
    } catch (error) {
      return { error };
    }
  }
}
