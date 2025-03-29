'use client';

import Footer from "@/app/components/Footer";
import NavBarLogado from "@/app/components/NavBarLogado";
import NavBarPadrao from "@/app/components/NavBarPadrao";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { GoArrowRight, GoLocation } from "react-icons/go";
import { MdAccessTime, MdCalendarToday } from "react-icons/md";
import Swal from "sweetalert2";

export default function Page({ params }) {
    const route = useRouter();
    
    // Estado para armazenar a sessão
    const [sessaoBuscada, setSessaoBuscada] = useState(null);
    
    // Carrega a sessão e o filme assim que os parâmetros estão disponíveis
    useEffect(() => {
        async function fetchParams() {
            const resolvedParams = await params;  // Aguarda a resolução do parâmetro
            const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
            const sessaoEncontrada = sessoes.find(item => item.id == resolvedParams.id);
            setSessaoBuscada(sessaoEncontrada);
        }

        fetchParams();
    }, [params]);

    // Garante que o filme buscado seja exibido
    const filmes = JSON.parse(localStorage.getItem('filmes'));
    const filmeBuscado = filmes.find(item => item.titulo === sessaoBuscada?.filme);

    const fileiras = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    const poltronas = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    const [selecionado, setSelecionado] = useState([]);
    const [bloqueadas, setBloqueadas] = useState([]);

    // Carrega as poltronas bloqueadas da sessão atual
    useEffect(() => {
        if (sessaoBuscada) {
            const poltronasBloqueadas = JSON.parse(localStorage.getItem('poltronas_bloqueadas')) || [];
            const sessaoAtual = poltronasBloqueadas.find(item => item.id === sessaoBuscada?.id);
            setBloqueadas(sessaoAtual?.poltronas || []);
        }
    }, [sessaoBuscada]);

    const selecionarPoltrona = (poltronaCompleta) => {
        setSelecionado((item) => item.includes(poltronaCompleta) ? item.filter(item => item !== poltronaCompleta) : [...item, poltronaCompleta]);
    };

    function limparSelecao() {
        setSelecionado([]);
    }

    function comprarIngresso() {
        const userLogado = JSON.parse(localStorage.getItem('sessaoLogin'));
        
        if (userLogado) {
            if (selecionado.length > 0) {
                const poltronasPreSelecionadas = selecionado;
                localStorage.setItem('poltronas_pre_selecionadas', JSON.stringify(poltronasPreSelecionadas));
                route.push(`/pagamentos/${sessaoBuscada.id}`);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Nenhuma poltrona selecionada',
                    text: 'Por favor, selecione uma poltrona para que possamos continuar.',
                });
            }
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Sessão não existe',
                text: 'Por favor, faça login para que possamos continuar.',
            });
            route.push('/users/login');
        }
    }

    // Verifica a sessão do usuário
    useEffect(() => {
        const userLogado = JSON.parse(localStorage.getItem('sessaoLogin'));
        
        if (userLogado) {
            const tempoAtual = new Date().getTime();
            if (tempoAtual > userLogado.expirationTime) {
                localStorage.removeItem('sessaoLogin');
                Swal.fire({
                    icon: 'info',
                    title: 'Sessão expirada',
                    text: 'Por favor, faça login novamente.',
                });
                route.push('/users/login');
            }
        }
    }, []);

    return (
        <>
            <style jsx global> 
                {`
                    body {
                        background-color: #f0f0f0;
                    }
                `}
            </style>
            {JSON.parse(localStorage.getItem('sessaoLogin')) == null && <NavBarPadrao caminho="/" />}
            {JSON.parse(localStorage.getItem('sessaoLogin')) != null && <NavBarLogado caminho="/" />}
            <Container style={{ maxWidth: '1000px' }} className="mt-4">
                <Row style={{ maxWidth: '1000px' }} className="mb-3">
                    <Col md={2}>
                        <img src={filmeBuscado?.imagem_filme} style={{ width: '100%', height: 'auto' }} alt={filmeBuscado?.titulo} />
                    </Col>
                    <Col md={10}>
                        <div className="mb-3 bg-white" style={{ padding: '20px 15px', width: '100%' }}>
                            <Row>
                                <Col md={9}>
                                    <Card.Body>
                                        <Card.Title as={'h3'}>{filmeBuscado?.titulo}</Card.Title>
                                        <Card.Text>
                                            <MdCalendarToday className="text-primary me-1" /> <b>Data:</b> {sessaoBuscada?.data_sessao} <br />
                                            <MdAccessTime className="text-primary me-1" /> <b>Horário:</b> {sessaoBuscada?.horario_sessao} <br />
                                            <GoLocation className="text-primary me-1" /> <b>Sala:</b> {sessaoBuscada?.sala}
                                        </Card.Text>
                                    </Card.Body>
                                    <Link href={`/sessoes/${filmeBuscado?.id}`} className="btn btn-warning mt-2 text-white">Trocar sessão</Link>
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
            <Footer />
        </>
    );
}