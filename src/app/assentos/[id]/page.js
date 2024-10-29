'use client';

import Footer from "@/app/components/Footer";
import NavBarPadrao from "@/app/components/NavBarPadrao";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { GoArrowRight } from "react-icons/go";

export default function Page({ params }) {

    const route = useRouter();

    const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    const sessaoBuscada = sessoes.find(item => item.id == params.id);
    const filmes = JSON.parse(localStorage.getItem('filmes'));
    const filmeBuscado = filmes.find(item => item.titulo == sessaoBuscada?.filme);

    const fileiras = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    const poltronas = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    const [selecionado, setSelecionado] = useState([]);
    const [bloqueadas, setBloqueadas] = useState([]);

    // Carrega as poltronas bloqueadas da sessão atual
    useEffect(() => {
        const poltronasBloqueadas = JSON.parse(localStorage.getItem('poltronas_bloqueadas')) || [];
        const sessaoAtual = poltronasBloqueadas.find(item => item.id === sessaoBuscada.id);

        setBloqueadas(sessaoAtual.poltronas || []);
    }, [sessaoBuscada]);

    const selecionarPoltrona = (poltronaCompleta) => {
        // Alterna a seleção
        setSelecionado((item) => item.includes(poltronaCompleta) ? item.filter(item => item !== poltronaCompleta) : [...item, poltronaCompleta]);
    };

    function limparSelecao() {
        //Limpa as que foram selecionadas
        setSelecionado([]);
    }

    const comprarIngresso = () => {
        // Buscar poltronas bloqueadas
        const poltronasBloqueadas = JSON.parse(localStorage.getItem('poltronas_bloqueadas')) || [];

        // Sessão atual
        const sessaoExistente = poltronasBloqueadas.find(sessao => sessao.id === sessaoBuscada.id);

        if (sessaoExistente) {
            //Se essa sessão ja existe, adione a ela
            sessaoExistente.poltronas.push(...selecionado);
        } else {
            //Se não existir crie uma nova
            poltronasBloqueadas.push({
                id: sessaoBuscada.id,
                poltronas: selecionado
            });
        }

        setBloqueadas(poltronasBloqueadas);
        localStorage.setItem('poltronas_bloqueadas', JSON.stringify(poltronasBloqueadas));

        //Limpar seleção
        setSelecionado([]);
    };

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
                                    <h2>{filmeBuscado.titulo}</h2>
                                </Col>
                                <Col md={3}>
                                    <button onClick={comprarIngresso} className="btn btn-success">
                                        Comprar Ingresso <GoArrowRight />
                                    </button>
                                </Col>
                                <p>{sessaoBuscada.sala} - {sessaoBuscada.horario_sessao}</p><br />
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