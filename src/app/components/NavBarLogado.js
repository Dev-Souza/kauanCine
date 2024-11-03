import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { FiUser, FiLogOut } from "react-icons/fi"; // Importando ícones

export default function NavBarLogado(props) {
    const route = useRouter();

    function logout() {
        localStorage.removeItem("sessaoLogin");  // Remove sessão do localStorage
        route.push("/users/login");  // Redireciona para página de login
    }

    const users = JSON.parse(localStorage.getItem('users'));
    const userLogado = JSON.parse(localStorage.getItem('sessaoLogin'));
    const infoUserLogado = users.find(item => item.email === userLogado?.email); // Adicione um fallback aqui

    return (
        <Navbar bg="dark" data-bs-theme="dark" style={{ height: 100 }} className="fs-5">
            <Container>
                <Navbar.Brand href="/">CineKauan</Navbar.Brand>
                <Nav className="ms-auto">
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" aria-label="User menu">
                            <FiUser className="me-2" />Olá, {infoUserLogado?.nome || 'Admin'} {/* Ícone de usuário */}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="/profile" aria-label="Meu perfil">
                                <FiUser className="me-2" /> Meu Perfil {/* Ícone de perfil */}
                            </Dropdown.Item>
                            <Dropdown.Item href="/settings" aria-label="Configurações">
                                <FiUser className="me-2" /> Configurações {/* Ícone de configurações */}
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={logout} aria-label="Sair">
                                <FiLogOut className="me-2" /> Sair {/* Ícone de sair */}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}