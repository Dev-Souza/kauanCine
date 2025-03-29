'use client';

import Footer from "@/app/components/Footer";
import NavBarLogado from "@/app/components/NavBarLogado";
import NavBarPadrao from "@/app/components/NavBarPadrao";
import PagamentosValidator from "@/app/validators/PagamentosValidator";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { GoArrowRight, GoLocation } from "react-icons/go";
import { MdOutlineChair, MdCalendarToday, MdAccessTime, MdAttachMoney } from "react-icons/md";
import Swal from "sweetalert2";
import { use } from 'react';

export default function Page({ params }) {
    const route = useRouter();

    // Desembrulhando o parâmetro `params` com `use` antes de acessar
    const paramId = use(params).id;

    const [poltronasPreSelecionadas, setPoltronasPreSelecionadas] = useState([]);
    const [filmes, setFilmes] = useState([]);
    const [sessoes, setSessoes] = useState([]);
    const [userLogado, setUserLogado] = useState(null);
    const [valorTotal, setValorTotal] = useState(0);
    const [valoresIngressos, setValoresIngressos] = useState({});

    useEffect(() => {
        // Verificar se estamos no lado do cliente
        if (typeof window !== "undefined") {
            const sessoesData = JSON.parse(localStorage.getItem('sessoes')) || [];
            const filmesData = JSON.parse(localStorage.getItem('filmes')) || [];
            const poltronasData = JSON.parse(localStorage.getItem('poltronas_pre_selecionadas')) || [];
            const userData = JSON.parse(localStorage.getItem('sessaoLogin'));

            setSessoes(sessoesData);
            setFilmes(filmesData);
            setPoltronasPreSelecionadas(poltronasData);
            setUserLogado(userData);

            // Inicializar os valores dos ingressos
            const valoresInicializados = poltronasData.reduce((acc, item) => {
                acc[item] = 32; // Define "Inteira" como padrão
                return acc;
            }, {});
            setValoresIngressos(valoresInicializados);

            // Calcular o valor total inicial
            const totalInicial = Object.values(valoresInicializados).reduce((acc, val) => acc + val, 0);
            setValorTotal(totalInicial);
        }
    }, []); // O array vazio garante que isso só aconteça uma vez após a renderização inicial

    // Verifica a sessão do usuário
    useEffect(() => {
        verificarSessao();
    }, []); 

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

    // Acessar a sessão e o filme buscado com base no param.id
    const sessaoBuscada = sessoes.find(item => item.id == paramId); // Usar paramId aqui
    const filmeBuscado = filmes.find(item => item.titulo == sessaoBuscada?.filme);

    const atualizarValorTotal = (novoValorIngresso, assento) => {
        const novosValores = { ...valoresIngressos, [assento]: novoValorIngresso };
        setValoresIngressos(novosValores);

        const total = Object.values(novosValores).reduce((acc, val) => acc + val, 0);
        setValorTotal(total);
    };

    function comprarIngresso() {
        // Buscar poltronas bloqueadas
        const poltronasBloqueadas = JSON.parse(localStorage.getItem('poltronas_bloqueadas')) || [];

        // Sessão atual
        const sessaoExistente = poltronasBloqueadas.find(sessao => sessao.id === sessaoBuscada.id);

        if (sessaoExistente) {
            // Se essa sessão já existe, adicione a ela
            sessaoExistente.poltronas.push(...poltronasPreSelecionadas);
        } else {
            // Se não existir, crie uma nova
            poltronasBloqueadas.push({
                id: sessaoBuscada.id,
                poltronas: poltronasPreSelecionadas
            });
        }
        localStorage.setItem('poltronas_bloqueadas', JSON.stringify(poltronasBloqueadas));

        // Parte para salvar as informações da compra
        let pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];

        const novoPagamento = {
            valorTotalCompra: valorTotal,
            filme: filmeBuscado.id,
            sessao: sessaoBuscada.id,
            poltronas: poltronasPreSelecionadas,
            dataCompra: new Date().toLocaleString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }),
            user: userLogado.email
        };

        pagamentos.push(novoPagamento); // Adiciona o pagamento corretamente ao array
        localStorage.setItem('pagamentos', JSON.stringify(pagamentos));

        Swal.fire({
            title: "Assento reservado com sucesso!",
            text: "Mais informações foram mandadas para seu email",
            icon: "success"
        });

        return route.push('/');
    }

    return (
        <>
            <style jsx global>{`
                body {
                    background-color: #f0f0f0;
                }
            `}</style>
            {userLogado == null && <NavBarPadrao caminho="/" />}
            {userLogado != null && <NavBarLogado caminho="/" />}
            <Container style={{ maxWidth: '1000px' }} className="mt-4 mb-4">
                <h1>Pagamento de Ingressos</h1>
                <Row>
                    <Col md={8}>
                        <Card className="mb-3 ">
                            <Row className="p-3">
                                <Col md={3}>
                                    <Card.Img src={filmeBuscado?.imagem_filme} alt={filmeBuscado?.titulo} />
                                </Col>
                                <Col md={9}>
                                    <Card.Body>
                                        <Card.Title as={'h3'}>{filmeBuscado?.titulo}</Card.Title>
                                        <Card.Text>
                                            <MdCalendarToday className="text-primary me-1" /> <b>Data:</b> {sessaoBuscada?.data_sessao} <br />
                                            <MdAccessTime className="text-primary me-1" /> <b>Horário:</b> {sessaoBuscada?.horario_sessao} <br />
                                            <GoLocation className="text-primary me-1" /> <b>Sala:</b> {sessaoBuscada?.sala}
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
                                    validationSchema={PagamentosValidator}
                                    onSubmit={values => salvar(values)}
                                >
                                    {({
                                        values,
                                        handleChange,
                                        setFieldValue,
                                        errors,
                                        touched
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
                                                                isInvalid={touched.tipo_ingresso && errors.tipo_ingresso}
                                                            >
                                                                <option value={'INTEIRA'}>Inteira - R$ 32</option>
                                                                <option value={'ESTUDANTE'}>Estudante - PROMOCIONAL - R$ 16</option>
                                                                <option value={'MEIA'}>Meia - PROMOCIONAL - R$ 16</option>
                                                            </Form.Select>
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.tipo_ingresso}
                                                            </Form.Control.Feedback>
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