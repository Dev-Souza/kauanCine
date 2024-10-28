'use client'

import Link from "next/link";
import { Card, Col, Container, Row } from "react-bootstrap";
import { ImFilm } from "react-icons/im";
import { MdMeetingRoom } from "react-icons/md";
import { SiSessionize } from "react-icons/si";
import NavBarPadrao from "../components/NavBarPadrao";

export default function Page() {
    return (
        <>
            <NavBarPadrao></NavBarPadrao>
            <Container className="mt-5">
                <h1 className="text-center mb-4">Administração</h1>
                <Row className="g-4">
                    <Col md={4}>
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
                    <Col md={4}>
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
                    <Col md={4}>
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
                </Row>
            </Container>
        </>
    );
}