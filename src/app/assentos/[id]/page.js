'use client'

import NavBarPadrao from "@/app/components/NavBarPadrao";
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";

export default function Page({ params }) {

    const route = useRouter();

    const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    // Buscando a sessão que o usuário escolheu
    const sessaoBuscada = sessoes.find(item => item.id == params.id);
    console.log(sessaoBuscada);

    //buscando filme escolhido
    const filmes = JSON.parse(localStorage.getItem('filmes'))
    const filmeBuscado = filmes.find(item => item.titulo == sessaoBuscada.filme)
    console.log(filmeBuscado)
    //Parte de seleção de poltrona
    const [poltronas, setPoltronas] = useState(Array(72).fill("Livre"));

    const verificarPoltronas = (index) => {
        const novasPoltronas = [...poltronas];
        if (novasPoltronas[index] === "Livre") {
            novasPoltronas[index] = "Escolhida";
        } else if (novasPoltronas[index] === "Escolhida") {
            novasPoltronas[index] = "Livre";
        }
        setPoltronas(novasPoltronas);
    };

    const liberarPoltronas = () => {
        setPoltronas(Array(72).fill("Livre"));
    };

    const calcularValorTotal = () => {
        const totalEscolhidas = poltronas.filter((poltrona) => poltrona === "Escolhida").length;
        alert(`Total de poltronas escolhidas: ${totalEscolhidas}`);
    };

    //Função para formatar data
    const formatarData = (dataString) => {
        const data = new Date(dataString);
        const dia = String(data.getDate()).padStart(2, '0'); // Adiciona zero à esquerda se necessário
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam do zero
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`; // Retorna a data no formato DD/MM/AAAA
    };

    return (
        <>
            <NavBarPadrao caminho={`/`}></NavBarPadrao>

            <Container>
                <Row className="mt-4">
                    <Col md={2}>
                        <img src={filmeBuscado.imagem_filme} style={{ width: '100%' }} />
                    </Col>
                    <Col md={10}>
                        <h2>{filmeBuscado.titulo}</h2>
                        <p>Data: <b>{formatarData(sessaoBuscada.data_sessao)}</b> - <b>{sessaoBuscada.horario_sessao}</b>
                            <br />
                            {sessaoBuscada.sala}
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-center mb-2 mt-4">
                    {/* Renderiza as poltronas com responsividade */}
                    {poltronas.map((status, index) => (
                        <Col xs={3} sm={3} md={2} lg={1} key={index} className="mb-3">
                            <img
                                src={`/assets/images/Poltrona${status}.png`}
                                alt={status}
                                className="img-fluid"
                                onClick={() => verificarPoltronas(index)}
                                style={{ height: 55, cursor: "pointer" }}
                            />
                        </Col>
                    ))}
                </Row>

                <hr />
                <Row className="text-center my-4 justify-content-center">
                    <Col md={3}>
                        <h4 className="text-center">Tipos de Poltronas</h4>
                    </Col>
                    <Col md={9}>
                        <Row className="justify-content-center">
                            <Col xs={4} sm={3} className="d-flex flex-column align-items-center">
                                <img src="/assets/images/PoltronaLivre.png" alt="Livre" style={{ height: 40 }} />
                                <p>Disponível</p>
                            </Col>
                            <Col xs={4} sm={3} className="d-flex flex-column align-items-center">
                                <img src="/assets/images/PoltronaEscolhida.png" alt="Escolhida" style={{ height: 40 }} />
                                <p>Escolhida</p>
                            </Col>
                            <Col xs={4} sm={3} className="d-flex flex-column align-items-center">
                                <img src="/assets/images/PoltronaOcupada.png" alt="Ocupada" style={{ height: 40 }} />
                                <p>Ocupada</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <hr />

                <Row className="text-center">
                    <Col>
                        <Button onClick={liberarPoltronas} variant="info" className="mx-2">
                            Liberar Poltronas
                        </Button>
                        <Button onClick={calcularValorTotal} variant="success" className="mx-2">
                            Comprar ingressos
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
