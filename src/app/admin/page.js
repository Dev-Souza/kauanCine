'use client'

import Link from "next/link";
import { Card, Col, Container, Row } from "react-bootstrap";
import { ImFilm } from "react-icons/im";
import { MdMeetingRoom } from "react-icons/md";
import { SiSessionize, SiDatadog } from "react-icons/si";
import NavBarLogado from "../components/NavBarLogado";
import { useEffect } from "react";
import NavBarHeader from "../components/NavBarHeader";

export default function Page() {

    const userLogado = JSON.parse(localStorage.getItem('sessaoLogin'));

    useEffect(() => {
        verificarSessao();
    }, []);

    function verificarSessao() {
        if (userLogado) {
            const tempoAtual = new Date().getTime();
            if (tempoAtual > userLogado.expirationTime) {
                // Expirou a sessão
                localStorage.removeItem('sessaoLogin');
                Swal.fire({
                    icon: 'info',
                    title: 'Sessão expirada',
                    text: 'Por favor, faça login novamente.',
                });
                route.push('/users/login');
            }
        }
    }

    return (
        <>
            {userLogado != null && <NavBarLogado />}
            {userLogado == null && <NavBarHeader />}
            <Container className="mt-5">
                <h1 className="text-center mb-4 display-4 fw-bold">Painel de Administração</h1>
                <p className="text-center mb-5 text-muted">
                    Acesse as seções abaixo para gerenciar o conteúdo e os dados do KauanCine.
                </p>
                <Row className="g-4">
                    <Col md={6} lg={3}>
                        <Link href={'/admin/filme'} passHref>
                            <Card className="text-center h-100 shadow-sm" border="primary">
                                <Card.Header className="bg-primary text-white fw-bold">Filmes</Card.Header>
                                <Card.Body>
                                    <ImFilm className="text-primary display-4 mb-3" />
                                    <Card.Text>Gerencie o catálogo de filmes</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={6} lg={3}>
                        <Link href={'/admin/sala'} passHref>
                            <Card className="text-center h-100 shadow-sm" border="success">
                                <Card.Header className="bg-success text-white fw-bold">Salas</Card.Header>
                                <Card.Body>
                                    <MdMeetingRoom className="text-success display-4 mb-3" />
                                    <Card.Text>Gerencie as salas disponíveis</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={6} lg={3}>
                        <Link href={'/admin/sessao'} passHref>
                            <Card className="text-center h-100 shadow-sm" border="info">
                                <Card.Header className="bg-info text-white fw-bold">Sessões</Card.Header>
                                <Card.Body>
                                    <SiSessionize className="text-info display-4 mb-3" />
                                    <Card.Text>Gerencie as sessões de filmes</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={6} lg={3}>
                        <Link href={'/admin/dashboard'} passHref>
                            <Card className="text-center h-100 shadow-sm" border="dark">
                                <Card.Header className="bg-dark text-white fw-bold">Dashboard</Card.Header>
                                <Card.Body>
                                    <SiDatadog className="text-dark display-4 mb-3" />
                                    <Card.Text>Visualize os dados do KauanCine</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
}