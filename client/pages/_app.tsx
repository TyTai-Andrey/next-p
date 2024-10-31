// local imports
// hocs
import appWithRedux, { IAppProps } from "@hocs/appWithRedux";

// styles
import "@styles/globals.css";

// components
import AuthProvider from "@providers/AuthProvider";
import GameProvider from "@providers/GameProvider";
import Layout from "@compositions/Layout";
import ModalProvider from "@providers/ModalProvider";

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

export default appWithRedux(App);
