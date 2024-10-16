// local imports
// api
import BaseApi from "@api/BaseApi";

export default class AuthApi {
  static async login(login: string): Promise<ITypeOrError<{ token: string }>> {
    const client = BaseApi.getClient();
    const options = {
      data: { login },
      method: "POST",
      url: "/login",
    };

    try {
      const response = await client(options);
      return response.data;
    } catch (error) {
      return { error };
    }
  }
}
