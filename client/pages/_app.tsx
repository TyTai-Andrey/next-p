// next
import type { AppProps } from "next/app";

// local imports
// hocs
import appWithRedux from "@hocs/appWithRedux";

// styles
import "@styles/globals.css";

// components
import AuthProvider from "@compositions/AuthProvider";
import GameProvider from "@compositions/GameProvider";
import Layout from "@compositions/Layout";
import ModalProvider from "@compositions/ModalProvider";

const App = ({ Component, pageProps }: AppProps & { Component: { withSearchHeader?: boolean } }) => (
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

export default appWithRedux(App);
