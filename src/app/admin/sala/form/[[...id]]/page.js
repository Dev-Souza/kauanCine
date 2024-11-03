'use client'

import { SalasValidator } from "@/app/validators/SalasValidator";
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

    const salas = JSON.parse(localStorage.getItem('salas')) || []
    const dados = salas.find(item => item.id == params.id)
    const sala = dados || { nome: '', tipo_sala: '' }

    function salvar(dados) {

        if (sala.id) {
            Object.assign(sala, dados)
            Swal.fire({
                title: "Sala alterada com sucesso!",
                text: "A sala foi alterada no sistema",
                icon: "success"
            });
        } else {
            dados.id = v4()
            salas.push(dados)
            Swal.fire({
                title: "Sala cadastrada com sucesso!",
                text: "A sala foi adicionada ao sistema",
                icon: "success"
            });
        }

        localStorage.setItem('salas', JSON.stringify(salas))
        return route.push('/admin/sala');
    }

    return (
        <Formik
            initialValues={sala}
            validationSchema={SalasValidator}
            onSubmit={values => salvar(values)}
        >
            {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched
            }) => (
                <Form className="mt-3">
                    <Form.Group className="mb-3" controlId="nome">
                        <Form.Label>Nome Sala</Form.Label>
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
                        <Form.Label>Tipo da sala</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            name="tipo_sala"
                            value={values.tipo_sala}
                            onChange={handleChange('tipo_sala')}
                            isInvalid={!!errors.tipo_sala && touched.tipo_sala}
                        >
                            <option value={''}>Selecione</option>
                            <option value='2D'>2D</option>
                            <option value='3D'>3D</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.tipo_sala}
                        </Form.Control.Feedback>
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