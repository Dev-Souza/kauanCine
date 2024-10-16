'use client'

import { useState } from "react";
import NavBarPadrao from "@/app/components/NavBarPadrao";
import { Formik } from "formik";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useRouter } from "next/navigation";

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
        console.log(data)
        alert(data.filmeBuscado.id)
        route.push('/assentos');
    }
    return (
        <>
            <NavBarPadrao caminho="/" />
            <Container>
                <h1>{filmeBuscado.titulo}</h1>
                <Row>
                    <Col>
                        <img src={filmeBuscado.imagem_filme} alt={filmeBuscado.titulo} />
                    </Col>
                    <Col>
                        <Formik
                            initialValues={{ data_sessao: '', horario_sessao_hidden: '', sala_hidden: '' }}
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
                                            {sessoesUnicas.map(item => (
                                                <option key={item.id} value={item.data_sessao}>
                                                    {new Date(item.data_sessao).toLocaleDateString('pt-BR')}
                                                </option>
                                            ))}
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
                                                            setFieldValue("horario_sessao_hidden", item.horario_sessao); // Captura o horário
                                                            setFieldValue("sala_hidden", item.sala); // Captura o horário
                                                            setFieldValue("filmeBuscado", filmeBuscado); // Captura o horário
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
        </>
    );
}
