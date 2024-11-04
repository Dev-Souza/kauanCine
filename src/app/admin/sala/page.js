'use client'

import Link from "next/link";
import { Container, Table } from "react-bootstrap";
import { FaAngleLeft, FaPlusCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import NavBarLogado from "@/app/components/NavBarLogado";
import NavBarHeader from "@/app/components/NavBarHeader";

export default function Page() {

    const [salas, setSalas] = useState([])

    useEffect(() => {
        setSalas(JSON.parse(localStorage.getItem('salas')) || [])
    }, [])

    function excluir(id) {
        Swal.fire({
            title: "Deseja realmente excluir?",
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, exclua-o!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                const dados = salas.filter(item => item.id != id)
                localStorage.setItem('salas', JSON.stringify(dados))
                setSalas(dados)
                Swal.fire({
                    title: "Deletado!",
                    text: "Sala excluída com sucesso.",
                    icon: "success"
                });
            }
        });
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
            {userLogado != null && <NavBarLogado />}
            {userLogado == null && <NavBarHeader />}
            <h1 className="text-center mt-4">Salas</h1>
            <Container>
                <Link href={"/admin/sala/form"} className="btn btn-primary" style={{marginRight: 5}}>
                    <FaPlusCircle />Novo
                </Link>
                <Link href={"/admin"} className="btn btn-danger"><FaAngleLeft />Tela Admin</Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Tipo Sala</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salas.map((item, i) => (
                            <tr key={item.id}>
                                <td>{i + 1}</td>
                                <td>{item.nome}</td>
                                <td>{item.tipo_sala}</td>
                                <td>
                                    <Link href={`/admin/sala/form/${item.id}`}>
                                        <MdEdit title="Editar" className="text-primary" />
                                    </Link>
                                    <FaTrashAlt
                                        title="Excluir"
                                        className="text-danger"
                                        onClick={() => excluir(item.id)}
                                    />

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}