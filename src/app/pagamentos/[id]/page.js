'use client'

import Footer from "@/app/components/Footer";
import NavBarPadrao from "@/app/components/NavBarPadrao";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { GoArrowRight } from "react-icons/go";
import { MdOutlineChair } from "react-icons/md";

export default function Page({ params }) {

    // Inicia o estado valoresIngressos com 32 para cada poltrona
    const poltronasPreSelecionadas = JSON.parse(localStorage.getItem('poltronas_pre_selecionadas')) || [];
    const valoresInicializados = poltronasPreSelecionadas.reduce((acc, item) => {
        acc[item] = 32; // Define "Inteira" como padrão
        return acc;
    }, {});

    const [valorTotal, setValorTotal] = useState(Object.values(valoresInicializados).reduce((acc, val) => acc + val, 0));
    const [valoresIngressos, setValoresIngressos] = useState(valoresInicializados);

    const sessoes = JSON.parse(localStorage.getItem('sessoes'));
    const sessaoBuscada = sessoes.find(item => item.id == params.id);

    const filmes = JSON.parse(localStorage.getItem('filmes'));
    const filmeBuscado = filmes.find(item => item.titulo == sessaoBuscada.filme);

    function comprarIngresso() {
        alert('Compra realizada com sucesso!')
    }

    const atualizarValorTotal = (novoValorIngresso, assento) => {
        const novosValores = { ...valoresIngressos, [assento]: novoValorIngresso };
        setValoresIngressos(novosValores);

        const total = Object.values(novosValores).reduce((acc, val) => acc + val, 0);
        setValorTotal(total);
    };

    return (
        <>
            <style jsx global>{`
                body {
                    background-color: #f0f0f0;
                }
            `}</style>
            <NavBarPadrao />
            <Container style={{ maxWidth: '1000px' }} className="mt-4">
                <h1>Pagamentos</h1>
                <Row>
                    <Col md={8}>
                        <Row style={{ maxWidth: '1000px' }} className="mb-3">
                            <Col md={3}>
                                <img src={filmeBuscado.imagem_filme} style={{ width: '100%', height: 'auto' }} alt={filmeBuscado.titulo} />
                            </Col>
                            <Col md={9}>
                                <div className="mb-3 bg-white" style={{ padding: '20px 15px', width: '100%' }}>
                                    <Row>
                                        <Col md={9}>
                                            <h2>{filmeBuscado.titulo}</h2>
                                            <p><b>Data:</b> {sessaoBuscada.data_sessao}<br /> {sessaoBuscada.sala} - {sessaoBuscada.horario_sessao}</p>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <div className="bg-white" style={{ padding: '20px 15px' }}>
                            <h2 className="fs-5">Escolha tipo de ingresso</h2>
                            <Formik
                                initialValues={{ tipo_ingresso: '' }}
                                onSubmit={values => salvar(values)}
                            >
                                {({
                                    values,
                                    handleChange,
                                    setFieldValue,
                                    handleSubmit,
                                }) => {
                                    const calcularIngresso = (campo, e, assento) => {
                                        let valorIngresso = e.target.value === 'ESTUDANTE' || e.target.value === 'MEIA' ? 16 : 32;

                                        atualizarValorTotal(valorIngresso, assento);
                                        setFieldValue(campo, e.target.value);
                                    };

                                    return (
                                        <Form className="mt-3">
                                            {poltronasPreSelecionadas.map((item) => (
                                                <Form.Group className="mb-3" controlId={`tipo_ingresso_${item}`} key={item}>
                                                    <InputGroup>
                                                        <InputGroup.Text>
                                                            <MdOutlineChair style={{ fontSize: '2em', color: 'green' }} /> {item}
                                                        </InputGroup.Text>
                                                        <Form.Select
                                                            aria-label="Selecione a data da sessão"
                                                            name={`tipo_ingresso_${item}`}
                                                            value={values[`tipo_ingresso_${item}`] || 'INTEIRA'}
                                                            onChange={(e) => calcularIngresso(`tipo_ingresso_${item}`, e, item)}
                                                        >
                                                            <option value={'INTEIRA'}>Inteira - R$ 32</option>
                                                            <option value={'ESTUDANTE'}>Estudante - PROMOCIONAL - R$ 16</option>
                                                            <option value={'MEIA'}>Meia - PROMOCIONAL - R$ 16</option>
                                                        </Form.Select>
                                                    </InputGroup>
                                                </Form.Group>
                                            ))}
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </Col>
                    <Col>
                        <div className="bg-white">
                            <div style={{ padding: '15px 10px 15px 10px' }}>
                                <h2 className="fs-5">Resumo do Pedido</h2>
                                <p><b>Ingressos:</b> {poltronasPreSelecionadas.length}</p>
                                <p><b>Total:</b> R$ {valorTotal}</p>
                                <hr />

                                <h5 className="fs-6">CineKauan</h5>
                                <span className="mt-1">QN0 34, AREA ESPECIAL 21 A: KauanLândia <br />
                                    Brasília - Distrito Federal</span>

                                <hr />

                                <button onClick={comprarIngresso} className="btn btn-success">
                                    Comprar Ingresso <GoArrowRight />
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}