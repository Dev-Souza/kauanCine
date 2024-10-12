import { Container, Nav, Navbar } from "react-bootstrap";

export default function NavBarHeader(props) {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{ height: 100 }}>
        <Container>
          <Navbar.Brand href="/" className="me-auto">
            <img src="" alt="" /> CineKauan
          </Navbar.Brand>
          <Nav className="mx-auto fs-5">
            <Nav.Link href="/">Voos</Nav.Link>
            <Nav.Link href="/aeroporto">Filmes</Nav.Link>
            <Nav.Link href="/passagem">Ingressos</Nav.Link>
          </Nav>
          <Nav className="ms-auto fs-5">
            <Nav.Link href="/user/login">Login</Nav.Link>
            <Nav.Link href="/user/form">Cadastre-se</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {props.children}
    </>
  );
}
