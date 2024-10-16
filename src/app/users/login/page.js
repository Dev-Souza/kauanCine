'use client'

import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

export default function Page() {
    const route = useRouter()

    function autenticar(dados) {
        if (dados.email === 'admin@gmail.com' && dados.senha === 'admin') {
            route.push('/admin')
        }
        // Buscar os usuários salvos no localStorage
        const usuarios = JSON.parse(localStorage.getItem('users')) || [];

        // Verificar se o usuário existe e se a senha está correta
        const usuarioEncontrado = usuarios.find(usuario => usuario.email === dados.email);

        if (usuarioEncontrado && usuarioEncontrado.senha === dados.senha) {
            alert('Acesso permitido!');
        } else {
            alert('Email ou senha incorretos.');
        }
    }

    return (
        <Formik
            initialValues={{ email: '', senha: '' }}
            onSubmit={values => autenticar(values)}
        >
            {({
                values,
                handleChange,
                handleSubmit,
            }) => (
                <Form className="mt-3">
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                            placeholder="ex: kauanCine@gmail.com"
                            name="email"
                            value={values.email}
                            onChange={handleChange('email')}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="senha">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password"
                            placeholder="Digite sua senha"
                            name="senha"
                            value={values.senha}
                            onChange={handleChange('senha')}
                        />
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="success" className="ms-1" onClick={handleSubmit}>
                            <FaCheck />Login
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}