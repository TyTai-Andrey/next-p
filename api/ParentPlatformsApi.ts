import BaseApi from "./BaseApi";

export default class ParentPlatformsApi {
  static async getList(params?: IPlatformListRequest):
    Promise<IListResult<PlatformDetails> | { error: unknown }> {
    const client = BaseApi.getClient();
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
