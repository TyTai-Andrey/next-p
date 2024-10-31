// next
import type { AppProps } from "next/app";

// local imports
// hocs
import appWithRedux from "@hocs/appWithRedux";

// styles
import "@styles/globals.css";

// components
import AuthProvider from "@providers/AuthProvider";
import GameProvider from "@providers/GameProvider";
import Layout from "@compositions/Layout";
import ModalProvider from "@providers/ModalProvider";

type ExtendedAppProps = { withSearchHeader?: boolean };
type IAppProps = AppProps & { Component: ExtendedAppProps };

const App = ({ Component, pageProps }: IAppProps) => (
  <AuthProvider>
    <GameProvider>
      <ModalProvider>
        <Layout withSearchHeader={Component.withSearchHeader}>
          <Component {...pageProps} />
        </Layout>
      </ModalProvider>
    </GameProvider>
  </AuthProvider>
);

export type { ExtendedAppProps, IAppProps };

export default appWithRedux(App);
