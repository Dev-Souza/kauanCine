'use client'

import { Formik } from "formik";
import { useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { GoArrowRight } from "react-icons/go";
import { MdOutlineChair } from "react-icons/md";

export default function Page({ params }) {

    const [valorTotal, setValorTotal] = useState(0)
    const sessoes = JSON.parse(localStorage.getItem('sessoes'));
    //Buscando as informações da sessâo escolhida
    const sessaoBuscada = sessoes.find(item => item.id == params.id);

    //Buscando informações de filme escolhido
    const filmes = JSON.parse(localStorage.getItem('filmes'))
    const filmeBuscado = filmes.find(item => item.titulo == sessaoBuscada.filme);
    console.log(filmeBuscado);

    const poltronasPreSelecionadas = JSON.parse(localStorage.getItem('poltronas_pre_selecionadas'));
    //Função para calcular total dos ingressos

    function comprarIngresso() {
        alert('Compra realizada com sucesso!')
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
            <Container style={{ maxWidth: '1000px' }} className="mt-4">
                <h1>Pagamentos</h1>
                <Row>
                    <Col md={8}>
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

                                        <p>{sessaoBuscada.sala} - {sessaoBuscada.horario_sessao}</p><br />
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
                                    function calcularTotal(campo, e){

                                        console.log(e.target.value);

                                        setValorTotal(valorTotal + parseFloat(e.target.value))
                                        setFieldValue(campo, e.target.value)
                                    }
                                    return (
                                        <Form className="mt-3">
                                            {poltronasPreSelecionadas.map(item => (
                                                <Form.Group className="mb-3" controlId={`tipo_ingresso_${item}`}>
                                                    <InputGroup>
                                                        <InputGroup.Text><MdOutlineChair style={{ fontSize: '2em', color: 'green' }} /> {item}</InputGroup.Text>
                                                        <Form.Select
                                                            aria-label="Selecione a data da sessão"
                                                            name={`tipo_ingresso_${item}`}
                                                            value={values[`tipo_ingresso_${item}`]}
                                                            onChange={(e)=>calcularTotal(`tipo_ingresso_${item}`, e)}
                                                        >
                                                            <option value={32}>Inteira - R$ 32</option>
                                                            <option value={16}>Estudante - PROMOCIONAL - R$ 16</option>
                                                            <option value={16}>Meia - PROMOCIONAL - R$ 16</option>
                                                        </Form.Select>
                                                    </InputGroup>
                                                </Form.Group>
                                            ))}

                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                    </Col>
                    <Col>
                        <div className="bg-white">
                            <div style={{ padding: '15px 10px 15px 10px' }}>
                                <h2 className="fs-5">Resumo do Pedido</h2>
                                <p>Ingressos: {poltronasPreSelecionadas.length}</p>
                                <p>Total: {valorTotal}</p>
                                <hr></hr>

                                <h5 className="fs-6">CineKauan</h5>
                                <span className="mt-1">QN0 34, AREA ESPECIAL 21 A: KauanLândia <br />
                                    Brasília - Distrito Federal</span>

                                <hr></hr>

                                <button onClick={comprarIngresso} className="btn btn-success">
                                    Comprar Ingresso <GoArrowRight />
                                </button>

                            </div>

                        </div>
                    </Col>
                </Row>


            </Container>
        </>
    );
}