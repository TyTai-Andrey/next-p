// vendor imports
import { Provider as ReduxProvider } from "react-redux";

// next
import type { AppProps } from "next/app";

// local imports
import initializeStore from "@store";

type ExtendedAppProps = { withSearchHeader?: boolean };
type IAppProps = AppProps & { Component: ExtendedAppProps };

const appWithRedux = (AppComponent: any) => {
  const AppWithRedux = (props: IAppProps) => {
    const { pageProps } = props;
    const { initialReduxState } = pageProps;

    const store = initializeStore({ ...(initialReduxState || {}) });

    return (
      <ReduxProvider store={store}>
        <AppComponent {...props} />
      </ReduxProvider>
    );
  };

  return AppWithRedux;
};

export type { ExtendedAppProps, IAppProps };
export default appWithRedux;
