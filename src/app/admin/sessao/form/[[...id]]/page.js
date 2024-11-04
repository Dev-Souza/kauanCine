'use client'

import NavBarHeader from "@/app/components/NavBarHeader";
import NavBarLogado from "@/app/components/NavBarLogado";
import { SessoesValidator } from "@/app/validators/SessoesValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form, Container, Card } from "react-bootstrap"; // Importar Container e Card
import { FaCheck, FaAngleLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import { v4 } from "uuid";

export default function Page({ params }) {
    const route = useRouter();
    
    const sessoes = JSON.parse(localStorage.getItem('sessoes')) || [];
    const dados = sessoes.find(item => item.id == params.id);
    const sessao = dados || { horario_sessao: '', data_sessao: '', filme: '', sala: '' };

    const [salas, setSalas] = useState([]);
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        setSalas(JSON.parse(localStorage.getItem('salas')) || []);
        setFilmes(JSON.parse(localStorage.getItem('filmes')) || []);
    }, []);

    function salvar(dados) {
        if (sessao.id) {
            Object.assign(sessao, dados);
            Swal.fire({
                title: "Sessão alterada com sucesso!",
                text: "A sessão foi alterada no sistema",
                icon: "success"
            });
        } else {
            dados.id = v4();
            sessoes.push(dados);
            Swal.fire({
                title: "Sessão cadastrada com sucesso!",
                text: "A sessão foi adicionada ao sistema",
                icon: "success"
            });
        }

        localStorage.setItem('sessoes', JSON.stringify(sessoes));
        route.push('/admin/sessao');
    }

    const userLogado = JSON.parse(localStorage.getItem('sessaoLogin'));

    useEffect(() => {
        verificarSessao();
    }, []);

    function verificarSessao() {
        if (userLogado) {
            const tempoAtual = new Date().getTime();
            if (tempoAtual > userLogado.expirationTime) {
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
                    <h3 className="text-center mb-3">Gerenciar Sessões</h3>
                    <p className="text-center text-muted mb-4">Preencha os campos abaixo para adicionar ou editar uma sessão.</p>

                    <Formik
                        initialValues={sessao}
                        validationSchema={SessoesValidator}
                        onSubmit={values => salvar(values)}
                    >
                        {({ values, handleChange, handleSubmit, errors, touched }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="horario_sessao">
                                    <Form.Label>Horário da Sessão</Form.Label>
                                    <Form.Control
                                        type="time"
                                        name="horario_sessao"
                                        value={values.horario_sessao}
                                        onChange={handleChange('horario_sessao')}
                                        isInvalid={!!errors.horario_sessao && touched.horario_sessao}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.horario_sessao}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="data_sessao">
                                    <Form.Label>Data da Sessão</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="data_sessao"
                                        value={values.data_sessao}
                                        onChange={handleChange('data_sessao')}
                                        isInvalid={!!errors.data_sessao && touched.data_sessao}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.data_sessao}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="filme">
                                    <Form.Label>Filme</Form.Label>
                                    <Form.Select
                                        name="filme"
                                        value={values.filme}
                                        onChange={handleChange('filme')}
                                        isInvalid={!!errors.filme && touched.filme}
                                    >
                                        <option value="">Selecione</option>
                                        {filmes.map(item => (
                                            <option key={item.id} value={item.titulo}>
                                                {item.titulo}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.filme}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="sala">
                                    <Form.Label>Sala</Form.Label>
                                    <Form.Select
                                        name="sala"
                                        value={values.sala}
                                        onChange={handleChange('sala')}
                                        isInvalid={!!errors.sala && touched.sala}
                                    >
                                        <option value="">Selecione</option>
                                        {salas.map(item => (
                                            <option key={item.id} value={item.nome}>
                                                {item.nome}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.sala}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-flex justify-content-between mt-4">
                                    <Link href="/admin/sessao" passHref>
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