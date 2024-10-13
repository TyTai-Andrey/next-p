// react
import { FC } from "react";

// local imports
// components
import Footer from "@components/Footer";
import Header from "@components/Header";
import Main from "@components/Main";

interface LayoutProps {
  withSearchHeader?: boolean;
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children, withSearchHeader }) => (
  <>
    <Header withSearch={withSearchHeader} />
    <Main>{children}</Main>
    <Footer />
  </>
);

export default Layout;
