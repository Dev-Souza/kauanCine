'use client'

import Link from "next/link";
import { Container, Table } from "react-bootstrap";
import { FaAngleLeft, FaPlusCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import NavBarLogado from "@/app/components/NavBarLogado";
import NavBarHeader from "@/app/components/NavBarHeader";
import { useRouter } from "next/navigation";

export default function Page() {
    const route = useRouter();

    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        setFilmes(JSON.parse(localStorage.getItem('filmes')) || [])
    }, [])

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
                const dados = filmes.filter(item => item.id != id)
                localStorage.setItem('filmes', JSON.stringify(dados))
                setFilmes(dados)
                Swal.fire({
                    title: "Deletado!",
                    text: "Filme excluído com sucesso.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <>
            {userLogado != null && <NavBarLogado />}
            {userLogado == null && <NavBarHeader />}
            <h1 className="text-center mt-4">Filmes</h1>
            <Container>
            <Link href={"/admin/filme/form"} className="btn btn-primary" style={{marginRight: 5}}>
                <FaPlusCircle />Novo
            </Link>
            <Link href={"/admin"} className="btn btn-danger"><FaAngleLeft />Tela Admin</Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Título Filme</th>
                        <th>Data Lançamento</th>
                        <th>Duração</th>
                        <th>Genero</th>
                        <th>Classificação</th>
                        <th>Imagem</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filmes.map((item, i) => (
                        <tr key={item.id}>
                            <td>{i + 1}</td>
                            <td>{item.titulo}</td>
                            <td>{item.data_lancamento}</td>
                            <td>{item.duracao}</td>
                            <td>{item.genero}</td>
                            <td>{item.classificacao}</td>
                            <td>
                                <img src={item.imagem_filme} style={{ height: 150, width: '60%', display: 'block', margin: '0 auto' }}/>
                            </td>
                            <td>
                                <Link href={`filme/form/${item.id}`}>
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