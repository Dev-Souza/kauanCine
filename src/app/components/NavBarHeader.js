import { Container, Nav, Navbar } from "react-bootstrap";

export default function NavBarHeader(props) {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{ height: 100 }}>
        <Container>
          <Navbar.Brand href="/" className="me-auto">
            KauanCine
          </Navbar.Brand>
          <Nav className="mx-auto fs-5">
            <Nav.Link href="/">Filmes</Nav.Link>
            <Nav.Link href="/">Ingressos</Nav.Link>
            <Nav.Link href="/">Contato</Nav.Link>
          </Nav>
          <Nav className="ms-auto fs-5">
            <Nav.Link href="/users/login">Login</Nav.Link>
            <Nav.Link href="/users/register">Cadastre-se</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {props.children}
    </>
  );
}
