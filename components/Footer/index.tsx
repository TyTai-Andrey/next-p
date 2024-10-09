// next
import Link from "next/link";

// local imports
// components
import Container from "@components/Footer/style";

const Footer = () => (
  <Container>
    <Link href="https://rawg.io/" target="_blank">Данные взяты из https://rawg.io/</Link>
  </Container>
);

export default Footer;
