'use client'

import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { v4 } from "uuid";

export default function Page({ params }) {

    const route = useRouter()

    const sessoes = JSON.parse(localStorage.getItem('sessoes')) || []
    const dados = sessoes.find(item => item.id == params.id)
    const sessao = dados || { horario_sessao: '', data_sessao: '', filme: '', sala: '' }

    const [salas, setSalas] = useState([]);
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        setSalas(JSON.parse(localStorage.getItem('salas')) || [])
        setFilmes(JSON.parse(localStorage.getItem('filmes')) || [])
    }, [])

    function salvar(dados) {

        if (sessao.id) {
            Object.assign(sessao, dados)
        } else {
            dados.id = v4()
            sessoes.push(dados)
        }

        localStorage.setItem('sessoes', JSON.stringify(sessoes))
        return route.push('/sessao');
    }

    return (
        <Formik
            initialValues={sessao}
            onSubmit={values => salvar(values)}
        >
            {({
                values,
                handleChange,
                handleSubmit,
            }) => (
                <Form className="mt-3">
                    <Form.Group className="mb-3" controlId="horario_sessao">
                        <Form.Label>Horario Sessão</Form.Label>
                        <Form.Control
                            type="time"
                            name="horario_sessao"
                            value={values.horario_sessao}
                            onChange={handleChange('horario_sessao')}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="data_sessao">
                        <Form.Label>Data Sessao</Form.Label>
                        <Form.Control type="date"
                            name="data_sessao"
                            value={values.data_sessao}
                            onChange={handleChange('data_sessao')}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="filme">
                        <Form.Label>Filme</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            name="filme"
                            value={values.uf}
                            onChange={handleChange('filme')}
                        >
                            <option value={''}>Selecione</option>
                            {filmes.map(item => (
                                <option
                                    key={item.id}
                                    value={item.titulo}
                                >
                                    {item.titulo}
                                </option>
                            ))}

                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="sala">
                        <Form.Label>Sala</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            name="sala"
                            value={values.uf}
                            onChange={handleChange('sala')}
                        >
                            <option value={''}>Selecione</option>
                            {salas.map(item => (
                                <option
                                    key={item.id}
                                    value={item.nome}
                                >
                                    {item.nome}
                                </option>
                            ))}

                        </Form.Select>
                    </Form.Group>
                    <div className="text-center">
                        <Link href={"/sessoes"} className="btn btn-primary"><FaAngleLeft />Voltar</Link>
                        <Button variant="success" className="ms-1" onClick={handleSubmit}>
                            <FaCheck />Salvar
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}