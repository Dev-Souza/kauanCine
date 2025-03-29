'use client';

import { useEffect, useState } from "react";
import NavBarPadrao from "@/app/components/NavBarPadrao";
import { Formik } from "formik";
import { Button, Card, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";
import Footer from "@/app/components/Footer";
import NavBarLogado from "@/app/components/NavBarLogado";
import Swal from "sweetalert2";

export default function Page() {
    const route = useRouter();
    const params = useParams(); // Captura corretamente os parâmetros da URL
    const [filmeBuscado, setFilmeBuscado] = useState(null);
    const [sessoesUnicas, setSessoesUnicas] = useState([]);
    const [sessoesFiltradas, setSessoesFiltradas] = useState([]);
    const [dataSelecionada, setDataSelecionada] = useState('');
    const [userLogado, setUserLogado] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Obtendo dados do filme
            const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
            const filmeEncontrado = filmes.find(item => item.id == params.id);
            setFilmeBuscado(filmeEncontrado);

            // Obtendo sessões disponíveis
            const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
            const sessoesDisponiveis = sessoes.filter(item => item.filme === filmeEncontrado?.titulo);
            
            // Removendo datas duplicadas
            const sessoesUnicas = sessoesDisponiveis.filter(
                (item, index, self) => index === self.findIndex((t) => t.data_sessao === item.data_sessao)
            );

            setSessoesUnicas(sessoesUnicas);

            // Verificando usuário logado
            const sessaoLogin = JSON.parse(localStorage.getItem('sessaoLogin'));
            setUserLogado(sessaoLogin);
        }
    }, [params.id]);

    useEffect(() => {
        if (dataSelecionada) {
            if (typeof window !== "undefined") {
                const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
                const sessoesDisponiveis = sessoes.filter(item => item.filme === filmeBuscado?.titulo);
                const sessoesFiltradas = sessoesDisponiveis.filter(item => item.data_sessao === dataSelecionada);
                setSessoesFiltradas(sessoesFiltradas);
            }
        }
    }, [dataSelecionada]);

    useEffect(() => {
        verificarSessao();
    }, [userLogado]);

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

    function salvar(data) {
        route.push(`/assentos/${data.id_sessao}`);
    }

    if (!filmeBuscado) {
        return <h1>Carregando...</h1>;
    }

    return (
        <>
            {userLogado == null ? <NavBarPadrao caminho="/" /> : <NavBarLogado caminho="/" />}
            <Container style={{ minHeight: '60vh' }}>
                <h1 className="text-center my-4">{filmeBuscado.titulo}</h1>
                <Row>
                    <Col md={4} className="text-center">
                        <img 
                            src={filmeBuscado.imagem_filme} 
                            alt={filmeBuscado.titulo} 
                            className="img-fluid rounded" 
                        />
                    </Col>
                    <Col md={8}>
                        <Formik
                            initialValues={{ data_sessao: '' }}
                            onSubmit={values => salvar(values)}
                        >
                            {({
                                values,
                                handleChange,
                                setFieldValue,
                                handleSubmit,
                            }) => (
                                <Form className="mt-3">
                                    <Form.Group controlId="data_sessao">
                                        <Form.Label>Data da Sessão</Form.Label>
                                        <Form.Select
                                            name="data_sessao"
                                            value={values.data_sessao}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setDataSelecionada(e.target.value);
                                            }}
                                        >
                                            <option value="">Selecione uma data</option>
                                            {sessoesUnicas.map(item => {
                                                const [ano, mes, dia] = item.data_sessao.split('-');
                                                const dataFormatada = new Date(ano, mes - 1, dia);
                                                return (
                                                    <option key={item.id} value={item.data_sessao}>
                                                        {dataFormatada.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                    
                                    <hr className="my-4" />

                                    {sessoesFiltradas.length > 0 ? (
                                        sessoesFiltradas.map(item => (
                                            <Card key={item.id} className="mb-3 shadow-sm">
                                                <Card.Body>
                                                    <Card.Subtitle className="text-muted mb-2">Sala: {item.sala}</Card.Subtitle>
                                                    <Card.Title>Horário: {item.horario_sessao}</Card.Title>
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => {
                                                            setFieldValue("id_sessao", item.id);
                                                            handleSubmit();
                                                        }}
                                                        className="mt-2"
                                                    >
                                                        Comprar Ingresso
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        ))
                                    ) : dataSelecionada ? (
                                        <Alert variant="warning" className="mt-4">
                                            Não há sessões disponíveis para a data selecionada.
                                        </Alert>
                                    ) : (
                                        <p className="text-muted mt-4">Selecione uma data para ver as sessões disponíveis.</p>
                                    )}
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}