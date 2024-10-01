import { useRouter } from "next/router";

type PushPouter = (path: string, routerParams?: ObjectType<string>) => void;
type PushRouterQuery = (searchParamName: string, param?: string | number | null) => void;
type PushRouterQueryList = (routerParams: ObjectType<string>) => void;

interface IUsePushRouter {
  pushRouter: PushPouter
  pushRouterQuery: PushRouterQuery
  pushRouterQueryList: PushRouterQueryList
}

const usePushRouter = (): IUsePushRouter => {
  const router = useRouter();
  const pushRouter: PushPouter = (path, routerParams) => {
    const query = new URLSearchParams();

    if (routerParams) {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const searchParamName in routerParams) {
        const param = routerParams[searchParamName];

        if (param) {
          query.set(searchParamName, String(param));
        }
      }
    }

    router.push(
      path + (query.toString()?.length ? `?${query.toString()}` : ""),
    );
  };
  const pushRouterQuery: PushRouterQuery = (searchParamName, param) => {
    const query = new URLSearchParams(router.query as any);
    if (query.has(searchParamName)) {
      query.delete(searchParamName);
    }
    if (!param) {
      query.delete(searchParamName);
    } else if (typeof param === "string" || typeof param === "number") {
      query.set(searchParamName, String(param));
    }

    router.push(query.toString()?.length ? `?${query.toString()}` : "/");
  };

  const pushRouterQueryList: PushRouterQueryList = (routerParams) => {
    const query = new URLSearchParams(router.query as any);

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const searchParamName in routerParams) {
      const param = routerParams[searchParamName];

      if (query.has(searchParamName)) {
        query.delete(searchParamName);
      }
      if (param) {
        query.set(searchParamName, String(param));
      }
    }

    router.push(query.toString()?.length ? `?${query.toString()}` : "/");
  };

  return {
    pushRouter,
    pushRouterQuery,
    pushRouterQueryList,
  };
};

export default usePushRouter;
