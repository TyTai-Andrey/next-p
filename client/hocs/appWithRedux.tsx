// vendor imports
import { Provider as ReduxProvider } from "react-redux";

// local imports
import initializeStore from "@store";

// pages
import { IAppProps } from "@pages/_app";

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

export default appWithRedux;
