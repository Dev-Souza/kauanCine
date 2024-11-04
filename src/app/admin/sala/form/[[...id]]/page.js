'use client'

import NavBarHeader from "@/app/components/NavBarHeader";
import NavBarLogado from "@/app/components/NavBarLogado";
import { SalasValidator } from "@/app/validators/SalasValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button, Form, Container, Card } from "react-bootstrap";
import { FaCheck, FaAngleLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import { v4 } from "uuid";

export default function Page({ params }) {
    const route = useRouter();
    const salas = JSON.parse(localStorage.getItem('salas')) || [];
    const dados = salas.find(item => item.id == params.id);
    const sala = dados || { nome: '', tipo_sala: '' };

    function salvar(dados) {
        if (sala.id) {
            Object.assign(sala, dados);
            Swal.fire({
                title: "Sala alterada com sucesso!",
                text: "A sala foi alterada no sistema",
                icon: "success",
            });
        } else {
            dados.id = v4();
            salas.push(dados);
            Swal.fire({
                title: "Sala cadastrada com sucesso!",
                text: "A sala foi adicionada ao sistema",
                icon: "success",
            });
        }

        localStorage.setItem('salas', JSON.stringify(salas));
        route.push('/admin/sala');
    }

    const userLogado = JSON.parse(localStorage.getItem('sessaoLogin'));

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

    return (
        <>
            {userLogado != null ? <NavBarLogado /> : <NavBarHeader />}
            <Container className="d-flex justify-content-center my-5">
                <Card style={{ maxWidth: '600px', width: '100%' }} className="p-4 shadow-sm">
                    <h3 className="text-center mb-3">Gerenciar Salas</h3>
                    <p className="text-center text-muted mb-4">Preencha os campos abaixo para adicionar ou editar uma sala.</p>

                    <Formik
                        initialValues={sala}
                        validationSchema={SalasValidator}
                        onSubmit={values => salvar(values)}
                    >
                        {({ values, handleChange, handleSubmit, errors, touched }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="nome">
                                    <Form.Label>Nome da Sala</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nome"
                                        value={values.nome}
                                        onChange={handleChange('nome')}
                                        isInvalid={!!errors.nome && touched.nome}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.nome}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="tipo_sala">
                                    <Form.Label>Tipo da Sala</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        name="tipo_sala"
                                        value={values.tipo_sala}
                                        onChange={handleChange('tipo_sala')}
                                        isInvalid={!!errors.tipo_sala && touched.tipo_sala}
                                    >
                                        <option value=''>Selecione</option>
                                        <option value='2D'>2D</option>
                                        <option value='3D'>3D</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.tipo_sala}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="d-flex justify-content-between mt-4">
                                    <Link href="/admin/sala" passHref>
                                        <Button variant="secondary" className="d-flex align-items-center">
                                            <FaAngleLeft className="me-2" /> Voltar
                                        </Button>
                                    </Link>
                                    <Button variant="success" className="d-flex align-items-center" onClick={handleSubmit}>
                                        <FaCheck className="me-2" /> Salvar
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Card>
            </Container>
        </>
    );
}