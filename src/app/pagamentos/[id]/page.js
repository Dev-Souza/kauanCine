'use client';

import Footer from "@/app/components/Footer";
import NavBarPadrao from "@/app/components/NavBarPadrao";
import { Formik } from "formik";
import { useState } from "react";
import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { GoArrowRight, GoLocation } from "react-icons/go";
import { MdOutlineChair, MdCalendarToday, MdAccessTime, MdAttachMoney } from "react-icons/md";

export default function Page({ params }) {

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
        //Buscar poltronas bloqueadas
        const poltronasBloqueadas = JSON.parse(localStorage.getItem('poltronas_bloqueadas')) || [];

        //Sessão atual
        const sessaoExistente = poltronasBloqueadas.find(sessao => sessao.id === sessaoBuscada.id);

        if (sessaoExistente) {
            // Se essa sessão ja existe, adione a ela
            sessaoExistente.poltronas.push(...poltronasPreSelecionadas);
        } else {
            // Se não existir crie uma nova
            poltronasBloqueadas.push({
                id: sessaoBuscada.id,
                poltronas: poltronasPreSelecionadas
            });
        }
        localStorage.setItem('poltronas_bloqueadas', JSON.stringify(poltronasBloqueadas));  

        alert('Assento reservado!')
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
            <NavBarPadrao caminho="/"/>
            <Container style={{ maxWidth: '1000px' }} className="mt-4">
                <h1>Pagamento de Ingressos</h1>
                <Row>
                    <Col md={8}>
                        <Card className="mb-3 ">
                            <Row className="p-3">
                                <Col md={3}>
                                    <Card.Img src={filmeBuscado.imagem_filme} alt={filmeBuscado.titulo} />
                                </Col>
                                <Col md={9}>
                                    <Card.Body>
                                        <Card.Title as={'h3'}>{filmeBuscado.titulo}</Card.Title>
                                        <Card.Text>
                                            <MdCalendarToday className="text-primary me-1" /> <b>Data:</b> {sessaoBuscada.data_sessao} <br />
                                            <MdAccessTime className="text-primary me-1" /> <b>Horário:</b> {sessaoBuscada.horario_sessao} <br />
                                            <GoLocation className="text-primary me-1" /> <b>Sala:</b> {sessaoBuscada.sala}
                                        </Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                        <Card className="bg-white  p-3">
                            <Card.Body>
                                <Card.Title as="h3">Escolha o tipo de ingresso</Card.Title>
                                <Formik
                                    initialValues={{ tipo_ingresso: '' }}
                                    onSubmit={values => salvar(values)}
                                >
                                    {({
                                        values,
                                        handleChange,
                                        setFieldValue,
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
                                                                aria-label="Selecione o tipo de ingresso"
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
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="bg-white  p-3">
                            <Card.Body>
                                <Card.Title as="h3">Resumo do Pedido</Card.Title>
                                <Card.Text><MdOutlineChair className="text-primary me-1" /> <b>Ingressos:</b> {poltronasPreSelecionadas.length}</Card.Text>
                                <Card.Text><MdAttachMoney className="text-primary me-1" /> <b>Total:</b> R$ {valorTotal}</Card.Text>
                                <hr />
                                <h5>CineKauan</h5>
                                <span>QN0 34, AREA ESPECIAL 21 A: KauanLândia <br /> Brasília - Distrito Federal</span>
                                <hr />
                                <Button onClick={comprarIngresso} className="btn-purchase w-100">
                                    Comprar Ingresso <GoArrowRight />
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}