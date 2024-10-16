import { Container, Nav, Navbar } from "react-bootstrap";

export default function NavBarPadrao(props) {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" style={{ height: 100 }} className="fs-5">
                <Container>
                    <Navbar.Brand href="/">CineKauan</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href={props.caminho}>Voltar</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}