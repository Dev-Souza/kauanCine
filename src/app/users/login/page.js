'use client';

import NavBarPadrao from '@/app/components/NavBarPadrao';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Form, Container, Card } from 'react-bootstrap';
import { FaCheck, FaUser, FaLock, FaUserPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function Page() {
    const route = useRouter();

    function autenticar(dados) {
        if (dados.email === 'admin' && dados.senha === 'admin') {
            return route.push('/admin');
        }
        const usuarios = JSON.parse(localStorage.getItem('users')) || [];
        const usuarioEncontrado = usuarios.find(usuario => usuario.email === dados.email);

        if (usuarioEncontrado && usuarioEncontrado.senha === dados.senha) {
            route.push('/');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email ou senha incorretos',
            });
        }
    }

    return (
        <>
            <NavBarPadrao caminho="/" />
            <Container className="d-flex justify-content-center align-items-center" style={{ marginTop: 80 }}>
                <Card className="shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
                    <Card.Body>
                        <h2 className="text-center mb-4">Login</h2>
                        <Formik
                            initialValues={{ email: '', senha: '' }}
                            onSubmit={values => autenticar(values)}
                        >
                            {({
                                values,
                                handleChange,
                                handleSubmit,
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>
                                            <FaUser className="me-2" /> Email
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="ex: kauanCine@gmail.com"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange('email')}
                                            className="shadow-sm"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="senha">
                                        <Form.Label>
                                            <FaLock className="me-2" /> Senha
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Digite sua senha"
                                            name="senha"
                                            value={values.senha}
                                            onChange={handleChange('senha')}
                                            className="shadow-sm"
                                        />
                                    </Form.Group>
                                    <div className="text-center">
                                        <Button
                                            variant="success"
                                            className="w-100 d-flex align-items-center justify-content-center"
                                            onClick={handleSubmit}
                                        >
                                            <FaCheck className="me-2" /> Login
                                        </Button>
                                    </div>
                                    <div className="mt-1">
                                        <Link href="/users/register" passHref>
                                            <Button variant="link" className="text-decoration-none">
                                                <FaUserPlus/> Não é cadastrado? Cadastre-se
                                            </Button>
                                        </Link>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}