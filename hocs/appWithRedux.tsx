// vendor imports
import { Provider as ReduxProvider } from "react-redux";

// local imports
import initializeStore from "@store";

/**
 * @description Оборачивает App-компонент на самом высоком уровне.
 *              Реализовано с целью сохранить state при смене языка.
 */
const appWithRedux = (AppComponent: any) => {
  const AppWithRedux = (props: any) => {
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
