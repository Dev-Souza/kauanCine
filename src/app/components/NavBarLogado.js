import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { FiUser, FiLogOut } from "react-icons/fi";

export default function NavBarLogado(props) {
    const route = useRouter();

    function logout() {
        localStorage.removeItem("sessaoLogin");  
        route.push("/users/login");  
    }

    const users = JSON.parse(localStorage.getItem('users'));
    const userLogado = JSON.parse(localStorage.getItem('sessaoLogin'));
    const infoUserLogado = users.find(item => item.email === userLogado?.email);

    return (
        <Navbar bg="dark" data-bs-theme="dark" style={{ height: 100 }} className="fs-5">
            <Container>
                <Navbar.Brand href="/">KauanCine</Navbar.Brand>
                <Nav className="ms-auto">
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" aria-label="User menu">
                            <FiUser className="me-2" />Olá, {infoUserLogado?.nome || 'Admin'}
                        </Dropdown.Toggle>

                        {infoUserLogado?.nome ? < Dropdown.Menu >
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={logout} aria-label="Sair">
                                <FiLogOut className="me-2" /> Sair 
                            </Dropdown.Item>
                        </Dropdown.Menu>
                            :
                            <Dropdown.Menu>
                                <Dropdown.Item href="/admin" aria-label="Configurações">
                                    <FiUser className="me-2" /> Tela Admin
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={logout} aria-label="Sair">
                                    <FiLogOut className="me-2" /> Sair 
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        }
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar >
    );
}