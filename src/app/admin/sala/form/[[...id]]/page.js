'use client'

import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { v4 } from "uuid";

export default function Page({ params }) {

    const route = useRouter()

    const salas = JSON.parse(localStorage.getItem('salas')) || []
    const dados = salas.find(item => item.id == params.id)
    const sala = dados || { nome: '', tipo_sala: '', capacidade: ''}

    function salvar(dados) {

        if (sala.id) {
            Object.assign(sala, dados)
        } else {
            dados.id = v4()
            salas.push(dados)
        }

        localStorage.setItem('salas', JSON.stringify(salas))
        return route.push('/admin/sala');
    }

    return (
        <Formik
            initialValues={sala}
            onSubmit={values => salvar(values)}
        >
            {({
                values,
                handleChange,
                handleSubmit,
            }) => (
                <Form className="mt-3">
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome Sala</Form.Label>
                        <Form.Control
                            type="text"
                            name="nome"
                            value={values.nome}
                            onChange={handleChange('nome')}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="tipo_sala">
                        <Form.Label>Tipo da sala</Form.Label>
                        <Form.Control type="text"
                            name="tipo_sala"
                            value={values.tipo_sala}
                            onChange={handleChange('tipo_sala')}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="capacidade">
                        <Form.Label>Capacidade</Form.Label>
                        <Form.Control type="number"
                            name="capacidade"
                            value={values.capacidade}
                            onChange={handleChange('capacidade')}
                        />
                    </Form.Group>
                    <div className="text-center">
                        <Link href={"/sala"} className="btn btn-primary"><FaAngleLeft />Voltar</Link>
                        <Button variant="success" className="ms-1" onClick={handleSubmit}>
                            <FaCheck />Salvar
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}