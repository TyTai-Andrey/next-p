// next
import type { AppProps } from "next/app";

// local imports
// hocs
import appWithRedux from "@hocs/appWithRedux";

// styles
import "@styles/globals.css";
import Layout from "@compositions/Layout";

const App = ({ Component, pageProps }: AppProps & { Component: { withSearchHeader?: boolean } }) => (
  <Layout withSearchHeader={Component.withSearchHeader}>
    <Component {...pageProps} />
  </Layout>
);

export default appWithRedux(App);
