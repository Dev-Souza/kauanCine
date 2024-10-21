import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaCodeBranch, FaHome, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="text-center text-lg-start text-white" style={{ backgroundColor: "#1c2331" }}>
            <Container>
                <section className="mt-5">
                    <Row className="text-center text-md-start">
                        <Col md={3} lg={4} xl={3} className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mt-4">KauanCine</h6>
                            <hr className="mb-3 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
                            <p>
                                Sistema de cinema onde podemos ver lançamentos, comprar ingressos, reservar assentos, e mais.
                            </p>
                        </Col>

                        <Col md={2} lg={2} xl={2} className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mt-4">Produtos</h6>
                            <hr className="mb-3 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
                            <p>
                                <Link href="/" className="text-white">Página Inicial</Link>
                            </p>
                            <p>
                                <Link href="/" className="text-white">Filmes</Link>
                            </p>
                            <p>
                                <Link href="/" className="text-white">Ingressos</Link>
                            </p>
                        </Col>

                        <Col md={3} lg={2} xl={2} className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mt-4">Links Úteis</h6>
                            <hr className="mb-3 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
                            <p>
                                <Link href="https://www.linkedin.com/in/kauan-souza-lima-b88347276/" className="text-white">
                                    <FaLinkedin className="me-2" />Meu LinkedIn
                                </Link>
                            </p>
                            <p>
                                <Link href="https://github.com/Dev-Souza?tab=repositories" className="text-white">
                                    <FaGithub className="me-2" />GitHub Profissional
                                </Link>
                            </p>
                            <p>
                                <Link href="https://github.com/Dev-Kauan/kauanCine" className="text-white">
                                    <FaCodeBranch className="me-2" />Este Repositório
                                </Link>
                            </p>
                        </Col>

                        <Col md={4} lg={3} xl={3} className="mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mt-4">Contato</h6>
                            <hr className="mb-3 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
                            <p><FaHome className="me-2" />Brasília, DF 70000-000, BR</p>
                            <p><FaEnvelope className="me-2" />kauan.souza.dev@gmail.com</p>
                            <p><FaPhone className="me-2" />(61) 98609-7721</p>
                        </Col>
                    </Row>
                </section>
            </Container>

            <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                © 2024 Copyright: <Link href="/" className="text-white">KauanCine</Link>
            </div>
        </footer>
    );
}