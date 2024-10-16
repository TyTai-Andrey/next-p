// local imports
// api
import BaseApi from "@api/BaseApi";

export default class ParentPlatformsApi {
  static async getList(params?: IPlatformListRequest):
    Promise<ITypeOrError<IListResult<PlatformDetails>>> {
    const client = BaseApi.getClientGames();
    const options = {
      method: "GET",
      params,
      url: "/platforms/lists/parents",
    };

    try {
      const response = await client(options);
      return response.data;
    } catch (error) {
      return { error };
    }
  }
}
