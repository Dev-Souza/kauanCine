'use client'

import React, { useEffect, useState } from "react";
import NavBarHeader from "@/app/components/NavBarHeader";
import NavBarLogado from "@/app/components/NavBarLogado";
import { FilmesSchema } from "@/app/validators/FilmesValidator";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button, Form, Container, Card } from "react-bootstrap";
import { FaCheck, FaAngleLeft } from "react-icons/fa";
import { mask } from "remask";
import Swal from "sweetalert2";
import { v4 } from "uuid";

export default function Page() {
    const { id } = useParams();
    const idFilme = id && Array.isArray(id) ? id[0] : id;
    const [filmes, setFilmes] = useState([]); // Definindo o estado para filmes
    const [loading, setLoading] = useState(true); // Estado para controle de carregamento
    const route = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const filmesLocal = JSON.parse(localStorage.getItem('filmes')) || [];
            setFilmes(filmesLocal);
            setLoading(false); // Quando os filmes são carregados, define o estado de carregamento como falso
            console.log("Filmes carregados:", filmesLocal);
        }
    }, []);

    function salvar(dados) {
        if (filme.id) {
            // Atualizando o filme existente
            const filmeIndex = filmes.findIndex(item => item.id === filme.id);
            if (filmeIndex !== -1) {
                filmes[filmeIndex] = dados;
                Swal.fire({
                    title: "Filme alterado com sucesso!",
                    text: "O filme foi alterado no sistema",
                    icon: "success",
                });
            }
        } else {
            // Adicionando um novo filme
            dados.id = v4(); // Gerando um novo ID
            filmes.push(dados); // Adicionando o novo filme à lista
            Swal.fire({
                title: "Filme cadastrado com sucesso!",
                text: "O filme foi adicionado ao sistema",
                icon: "success",
            });
        }

        // Atualizando os filmes no localStorage
        localStorage.setItem('filmes', JSON.stringify(filmes));

        // Redirecionando para a página de administração de filmes
        route.push('/admin/filme');
    }
    const dados = filmes.find(item => item.id === idFilme);
    const filme = dados || { titulo: '', data_lancamento: '', duracao: '', genero: '', classificacao: '', imagem_filme: '' };

    if (loading) {
        return <div>Carregando...</div>;  // Exibe uma mensagem enquanto os dados estão sendo carregados
    }

    return (
        <>
            <style jsx global>{`
                body {
                    background-color: #f0f0f0;
                }
                a {
                    text-decoration: none;
                }
            `}</style>
            <NavBarHeader />
            <Container className="d-flex justify-content-center align-items-center my-5">
                <Card style={{ maxWidth: '600px', width: '100%', padding: '30px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '15px', border: 'none' }}>
                    <h3 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#343a40' }}>Gerenciar Filmes</h3>
                    <p className="text-center text-muted mb-4" style={{ fontSize: '14px' }}>Preencha os campos abaixo para adicionar ou editar um filme.</p>

                    <Formik
                        initialValues={filme}
                        validationSchema={FilmesSchema}
                        onSubmit={values => salvar(values)}
                    >
                        {({ values, handleChange, handleSubmit, errors, touched }) => {
                            values.data_lancamento = mask(values.data_lancamento, '99/99/9999');
                            return (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className="mb-4" controlId="titulo">
                                        <Form.Label style={{ fontWeight: '600', color: '#495057' }}>Título do Filme</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Digite o título do filme"
                                            name="titulo"
                                            value={values.titulo}
                                            onChange={handleChange('titulo')}
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
                                            type="text"
                                            name="data_lancamento"
                                            placeholder="Digite a data de lançamento do filme"
                                            value={values.data_lancamento}
                                            onChange={handleChange('data_lancamento')}
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
                                            onChange={handleChange('duracao')}
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
                                            onChange={handleChange('genero')}
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
                                            onChange={handleChange('classificacao')}
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
                                            onChange={handleChange('imagem_filme')}
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
                            );
                        }}
                    </Formik>
                </Card>
            </Container>
        </>
    );
}