'use client'

import { useState } from "react";
import NavBarPadrao from "@/app/components/NavBarPadrao";
import { Formik } from "formik";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";

export default function Page({ params }) {

    const route = useRouter()

    const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    const filmeBuscado = filmes.find(item => item.id == params.id);

    // Buscando sessões disponíveis para o filme buscado
    const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    const sessaoDisponivelFilme = sessoes.filter(item => item.filme === filmeBuscado.titulo);

    // Removendo datas duplicadas para o select de datas
    const sessoesUnicas = sessaoDisponivelFilme.filter(
        (item, index, self) => index === self.findIndex((t) => t.data_sessao === item.data_sessao)
    );

    // Estado para armazenar a data selecionada
    const [dataSelecionada, setDataSelecionada] = useState('');

    // Filtrando as sessões com base na data selecionada
    const sessoesFiltradas = sessaoDisponivelFilme.filter(item => item.data_sessao === dataSelecionada);

    function salvar(data) {
        route.push(`/assentos/${data.id_sessao}`);
    }

    return (
        <Container className="d-flex flex-column min-vh-100">
            <NavBarPadrao caminho="/" />
            <Container fluid className="flex-grow-1">
                <h1>{filmeBuscado.titulo}</h1>
                <Row>
                    <Col>
                        <img src={filmeBuscado.imagem_filme} alt={filmeBuscado.titulo} className="img-fluid" />
                    </Col>
                    <Col>
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
                                    <Form.Group className="mb-3" controlId="data_sessao">
                                        <Form.Label>Data Sessão</Form.Label>
                                        <Form.Select
                                            aria-label="Selecione a data da sessão"
                                            name="data_sessao"
                                            value={values.data_sessao}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setDataSelecionada(e.target.value); // Atualiza a data selecionada
                                            }}
                                        >
                                            <option value={''}>Selecione</option>
                                            {sessoesUnicas.map(item => {
                                                // Extrair ano, mês e dia da string da data (assumindo formato 'YYYY-MM-DD')
                                                const [ano, mes, dia] = item.data_sessao.split('-');
                                                const dataCorrigida = new Date(ano, mes - 1, dia); // Mês no JavaScript é zero-indexado

                                                return (
                                                    <option key={item.id} value={item.data_sessao}>
                                                        {dataCorrigida.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                    {/* Renderizando as sessões filtradas */}
                                    {sessoesFiltradas.length > 0 ? (
                                        sessoesFiltradas.map(item => (
                                            <Card key={item.id} className="mb-3">
                                                <Card.Body>
                                                    <Card.Subtitle className="mb-2 text-muted">{item.sala}</Card.Subtitle>
                                                    <Card.Title>{item.horario_sessao}</Card.Title>
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => {
                                                            setFieldValue("id_sessao", item.id); // Captura o horário
                                                            handleSubmit(); // Chama o submit
                                                        }}
                                                    >
                                                        Comprar Ingresso
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        ))
                                    ) : (
                                        <p>Selecione uma data para ver as sessões disponíveis.</p>
                                    )}
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </Container>
    );
}
