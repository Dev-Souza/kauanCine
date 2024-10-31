'use client'

import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import { v4 } from "uuid";

export default function Page({ params }) {

    const route = useRouter()

    const filmes = JSON.parse(localStorage.getItem('filmes')) || []
    const dados = filmes.find(item => item.id == params.id)
    const filme = dados || { titulo: '', data_lancamento: '', duracao: '', genero: '', classificacao: '', imagem_filme: '' }

    function salvar(dados) {

        if (filme.id) {
            Object.assign(filme, dados)
            Swal.fire({
                title: "Filme alterado com sucesso!",
                text: "O filme foi alterado ao sistema",
                icon: "success"
              });
        } else {
            dados.id = v4()
            filmes.push(dados)
            Swal.fire({
                title: "Filme cadastrado com sucesso!",
                text: "O filme foi adicionado ao sistema",
                icon: "success"
              });
        }

        localStorage.setItem('filmes', JSON.stringify(filmes))
        return route.push('/admin/filme');
    }

    return (
            <Formik
                initialValues={filme}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form className="mt-3">
                        <Form.Group className="mb-3" controlId="titulo">
                            <Form.Label>Título Filme</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite o titulo do filme"
                                name="titulo"
                                value={values.titulo}
                                onChange={handleChange('titulo')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="data_lancamento">
                            <Form.Label>Data Lançamento</Form.Label>
                            <Form.Control type="date"
                                name="data_lancamento"
                                value={values.data_lancamento}
                                onChange={handleChange('data_lancamento')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="duracao">
                            <Form.Label>Duração</Form.Label>
                            <Form.Control type="time"
                                placeholder="Digite o nome da filme"
                                name="duracao"
                                value={values.duracao}
                                onChange={handleChange('duracao')}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="genero">
                            <Form.Label>Genêro</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                name="genero"
                                value={values.genero}
                                onChange={handleChange('genero')}
                            >
                                <option value={''}>Selecione</option>
                                <option value={'Ação'}>Ação</option>
                                <option value={'Animação'}>Animação</option>
                                <option value={'Aventura'}>Aventura</option>
                                <option value={'Comédia'}>Comédia</option>
                                <option value={'Documentário'}>Documentário</option>
                                <option value={'Drama'}>Drama</option>
                                <option value={'Fantasia'}>Fantasia</option>
                                <option value={'Ficção Científica'}>Ficção Científica</option>
                                <option value={'Romance'}>Romance</option>
                                <option value={'Terror'}>Terror</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="classificacao">
                            <Form.Label>Classificação do filme</Form.Label>
                            <Form.Select
                                aria-label="Selecione uma idade para classificação"
                                name="classificacao"
                                value={values.classificacao}
                                onChange={handleChange('classificacao')}
                            >
                                <option value={''}>Selecione</option>
                                <option value={'Livre'}>Livre</option>
                                <option value={'10 anos'}>10 anos</option>
                                <option value={'12 anos'}>12 anos</option>
                                <option value={'14 anos'}>14 anos</option>
                                <option value={'16 anos'}>16 anos</option>
                                <option value={'18 anos'}>18 anos</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="imagem_filme">
                            <Form.Label>Imagem do Filme:</Form.Label>
                            <Form.Control type="text"
                                name="imagem_filme"
                                value={values.imagem_filme}
                                onChange={handleChange('imagem_filme')}
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Link href={"/filmes"} className="btn btn-primary"><FaAngleLeft />Voltar</Link>
                            <Button variant="success" className="ms-1" onClick={handleSubmit}>
                                <FaCheck />Salvar
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
    )
}