'use client'

import NavBarHeader from "@/app/components/NavBarHeader";
import NavBarLogado from "@/app/components/NavBarLogado";
import { FilmesSchema } from "@/app/validators/FilmesValidator";
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
    const filmes = JSON.parse(localStorage.getItem('filmes')) || [];
    const dados = filmes.find(item => item.id === params.id);
    const filme = dados || { titulo: '', data_lancamento: '', duracao: '', genero: '', classificacao: '', imagem_filme: '' };

    function salvar(dados) {
        if (filme.id) {
            Object.assign(filme, dados);
            Swal.fire({
                title: "Filme alterado com sucesso!",
                text: "O filme foi alterado no sistema",
                icon: "success",
            });
        } else {
            dados.id = v4();
            filmes.push(dados);
            Swal.fire({
                title: "Filme cadastrado com sucesso!",
                text: "O filme foi adicionado ao sistema",
                icon: "success",
            });
        }
        localStorage.setItem('filmes', JSON.stringify(filmes));
        route.push('/admin/filme');
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
            <style jsx global>{`
                body {
                    background-color: #f0f0f0;
                }
                    a {
    text-decoration: none; /* Remove o sublinhado de todos os links */
}
      `}</style>
            {userLogado != null && <NavBarLogado />}
            {userLogado == null && <NavBarHeader />}
            <Container className="d-flex justify-content-center align-items-center my-5">
                <Card style={{ maxWidth: '600px', width: '100%', padding: '30px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '15px', border: 'none' }}>
                    <h3 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#343a40' }}>Gerenciar Filmes</h3>
                    <p className="text-center text-muted mb-4" style={{ fontSize: '14px' }}>Preencha os campos abaixo para adicionar ou editar um filme.</p>

                    <Formik
                        initialValues={filme}
                        validationSchema={FilmesSchema}
                        onSubmit={(values) => salvar(values)}
                    >
                        {({ values, handleChange, handleSubmit, errors, touched }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Form.Group className="mb-4" controlId="titulo">
                                    <Form.Label style={{ fontWeight: '600', color: '#495057' }}>Título do Filme</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite o título do filme"
                                        name="titulo"
                                        value={values.titulo}
                                        onChange={handleChange}
                                        isInvalid={touched.titulo && !!errors.titulo}
                                        style={{ borderRadius: '10px' }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.titulo}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="data_lancamento">
                                    <Form.Label style={{ fontWeight: '600', color: '#495057' }}>Data de Lançamento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="data_lancamento"
                                        value={values.data_lancamento}
                                        onChange={handleChange}
                                        isInvalid={touched.data_lancamento && !!errors.data_lancamento}
                                        style={{ borderRadius: '10px' }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.data_lancamento}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="duracao">
                                    <Form.Label style={{ fontWeight: '600', color: '#495057' }}>Duração</Form.Label>
                                    <Form.Control
                                        type="time"
                                        name="duracao"
                                        value={values.duracao}
                                        onChange={handleChange}
                                        isInvalid={touched.duracao && !!errors.duracao}
                                        style={{ borderRadius: '10px' }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.duracao}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="genero">
                                    <Form.Label style={{ fontWeight: '600', color: '#495057' }}>Gênero</Form.Label>
                                    <Form.Select
                                        name="genero"
                                        value={values.genero}
                                        onChange={handleChange}
                                        isInvalid={touched.genero && !!errors.genero}
                                        style={{ borderRadius: '10px' }}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Ação">Ação</option>
                                        <option value="Animação">Animação</option>
                                        <option value="Aventura">Aventura</option>
                                        <option value="Comédia">Comédia</option>
                                        <option value="Documentário">Documentário</option>
                                        <option value="Drama">Drama</option>
                                        <option value="Fantasia">Fantasia</option>
                                        <option value="Ficção Científica">Ficção Científica</option>
                                        <option value="Romance">Romance</option>
                                        <option value="Terror">Terror</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.genero}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="classificacao">
                                    <Form.Label style={{ fontWeight: '600', color: '#495057' }}>Classificação</Form.Label>
                                    <Form.Select
                                        name="classificacao"
                                        value={values.classificacao}
                                        onChange={handleChange}
                                        isInvalid={touched.classificacao && !!errors.classificacao}
                                        style={{ borderRadius: '10px' }}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Livre">Livre</option>
                                        <option value="10 anos">10 anos</option>
                                        <option value="12 anos">12 anos</option>
                                        <option value="14 anos">14 anos</option>
                                        <option value="16 anos">16 anos</option>
                                        <option value="18 anos">18 anos</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.classificacao}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="imagem_filme">
                                    <Form.Label style={{ fontWeight: '600', color: '#495057' }}>Imagem do Filme (URL)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite o URL da imagem do filme"
                                        name="imagem_filme"
                                        value={values.imagem_filme}
                                        onChange={handleChange}
                                        isInvalid={touched.imagem_filme && !!errors.imagem_filme}
                                        style={{ borderRadius: '10px' }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.imagem_filme}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-flex justify-content-between mt-4">
                                    <Link href="/admin/filme" passHref>
                                        <Button variant="secondary" className="rounded-pill px-4">
                                            <FaAngleLeft className="me-2" /> Voltar
                                        </Button>
                                    </Link>
                                    <Button variant="success" onClick={handleSubmit} className="rounded-pill px-4">
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