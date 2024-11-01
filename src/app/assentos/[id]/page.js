'use client';

import Footer from "@/app/components/Footer";
import NavBarPadrao from "@/app/components/NavBarPadrao";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { GoArrowRight, GoLocation } from "react-icons/go";
import { MdAccessTime, MdCalendarToday } from "react-icons/md";

export default function Page({ params }) {

    const route = useRouter();
    const sessaoBuscada = React.useMemo(() => {
        const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
        return sessoes.find(item => item.id == params.id);
    }, [params.id]);
    const filmes = JSON.parse(localStorage.getItem('filmes'));
    const filmeBuscado = filmes.find(item => item.titulo == sessaoBuscada?.filme);

    const fileiras = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    const poltronas = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    const [selecionado, setSelecionado] = useState([]);
    const [bloqueadas, setBloqueadas] = useState([]);

    // Carrega as poltronas bloqueadas da sessão atual
    useEffect(() => {
        console.log('Sessao buscada:', sessaoBuscada);
        const poltronasBloqueadas = JSON.parse(localStorage.getItem('poltronas_bloqueadas')) || [];
        const sessaoAtual = poltronasBloqueadas.find(item => item.id === sessaoBuscada?.id);

        setBloqueadas(sessaoAtual?.poltronas || []);
    }, [sessaoBuscada]);

    const selecionarPoltrona = (poltronaCompleta) => {
        // Alterna a seleção
        setSelecionado((item) => item.includes(poltronaCompleta) ? item.filter(item => item !== poltronaCompleta) : [...item, poltronaCompleta]);
    };

    function limparSelecao() {
        //Limpa as que foram selecionadas
        setSelecionado([]);
    }


    //Pré selecionar as poltronas
    function comprarIngresso() {
        const poltronasPreSelecionadas = selecionado;
        localStorage.setItem('poltronas_pre_selecionadas', JSON.stringify(poltronasPreSelecionadas));
        route.push(`/pagamentos/${sessaoBuscada.id}`);
    }

    return (
        <>
            <style jsx global>{
                `
                body {
                    background-color: #f0f0f0;
                }
                    `
            }</style>
            <NavBarPadrao caminho="/"></NavBarPadrao>
            <Container style={{ maxWidth: '1000px' }} className="mt-4">

                <Row style={{ maxWidth: '1000px' }} className="mb-3">
                    <Col md={2}>
                        <img src={filmeBuscado.imagem_filme} style={{ width: '100%', height: 'auto' }} alt={filmeBuscado.titulo} />
                    </Col>
                    <Col md={10}>
                        <div className="mb-3 bg-white" style={{ padding: '20px 15px', width: '100%' }}>
                            <Row>
                                <Col md={9}>
                                    <Card.Body>
                                        <Card.Title as={'h3'}>{filmeBuscado.titulo}</Card.Title>
                                        <Card.Text>
                                            <MdCalendarToday className="text-primary me-1" /> <b>Data:</b> {sessaoBuscada.data_sessao} <br />
                                            <MdAccessTime className="text-primary me-1" /> <b>Horário:</b> {sessaoBuscada.horario_sessao} <br />
                                            <GoLocation className="text-primary me-1" /> <b>Sala:</b> {sessaoBuscada.sala}
                                        </Card.Text>
                                    </Card.Body>
                                    <Link href={`/sessoes/${filmeBuscado.id}`} className="btn btn-warning mt-2 text-white">Trocar sessão</Link>
                                </Col>
                                <Col md={3}>
                                    <button onClick={comprarIngresso} className="btn btn-primary">
                                        Comprar Ingresso <GoArrowRight />
                                    </button>
                                </Col>

                            </Row>
                        </div>
                    </Col>
                </Row>

                <div className="bg-white" style={{ padding: '20px 15px' }}>
                    {selecionado.length > 0 && <h3>Assentos Selecionados: {selecionado}</h3>}
                    <Table striped hover size="sm" className="text-center">
                        <tbody>
                            {fileiras.map((fileira, index) => (
                                <tr key={index}>
                                    <td style={{ fontWeight: 'bold', verticalAlign: 'middle' }}>{fileira}</td>
                                    <td>
                                        <Row className="d-flex justify-content-center">
                                            {poltronas.map((poltrona, index) => {
                                                const poltronaCompleta = `${fileira}${poltrona}`;
                                                const isBloqueada = bloqueadas.includes(poltronaCompleta);
                                                const isSelecionada = selecionado.includes(poltronaCompleta);

                                                return (
                                                    <React.Fragment key={index}>
                                                        <Col xs="auto" className="p-1">
                                                            <div
                                                                onClick={!isBloqueada ? () => selecionarPoltrona(poltronaCompleta) : undefined}
                                                                style={{
                                                                    width: '40px',
                                                                    height: '40px',
                                                                    backgroundColor: isBloqueada
                                                                        ? 'gray'
                                                                        : isSelecionada
                                                                            ? 'lightgray'
                                                                            : 'green',
                                                                    color: 'white',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    borderRadius: '4px',
                                                                    margin: '2px',
                                                                    cursor: isBloqueada ? 'not-allowed' : 'pointer'
                                                                }}
                                                            >
                                                                {poltrona}
                                                            </div>
                                                        </Col>
                                                        {poltrona === '06' && (
                                                            <Col xs="auto" className="p-1">
                                                                <div
                                                                    style={{
                                                                        width: '40px',
                                                                        height: '40px',
                                                                        backgroundColor: 'transparent',
                                                                        margin: '2px',
                                                                    }}
                                                                />
                                                            </Col>
                                                        )}
                                                    </React.Fragment>
                                                );
                                            })}
                                        </Row>
                                    </td>
                                    <td style={{ fontWeight: 'bold', verticalAlign: 'middle' }}>{fileira}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button className="btn btn-primary" onClick={limparSelecao}>Limpar Seleção</Button>
                </div>
            </Container>
            <Footer></Footer>
        </>
    );
}