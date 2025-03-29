import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function NavBarLogado(props) {
    const route = useRouter();
    const [userLogado, setUserLogado] = useState({});
    const [users, setUsers] = useState([]);
    const [infoUserLogado, setInfoUserLogado] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            const storedUserLogado = JSON.parse(localStorage.getItem('sessaoLogin')) || {};
            const userInfo = storedUsers.find(item => item.email === storedUserLogado?.email);
            
            setUsers(storedUsers);
            setUserLogado(storedUserLogado);
            setInfoUserLogado(userInfo);
        }
    }, []);

    function logout() {
        localStorage.removeItem("sessaoLogin");  
        route.push("/users/login");  
    }

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