'use client'

import Link from "next/link";
import { Table } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Page() {

    const [salas, setSalas] = useState([])

    useEffect(() => {
        setSalas(JSON.parse(localStorage.getItem('salas')) || [])
    }, [])

    function excluir(id) {
        if (confirm('Deseja realmente excluir?')) {
            //Pega todos que é diferente do id informado pelo o parametro
            const dados = salas.filter(item => item.id != id)
            localStorage.setItem('salas', JSON.stringify(dados))
            setSalas(dados)
        }
    }

    return (
        <>
            <Link href={"/admin/sala/form"} className="btn btn-primary mb-3 mt-3">
                <FaPlusCircle />Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Tipo Sala</th>
                        <th>Capacidade</th>
                    </tr>
                </thead>
                <tbody>
                    {salas.map((item, i) => (
                        <tr key={item.id}>
                            <td>{i + 1}</td>
                            <td>{item.nome}</td>
                            <td>{item.tipo_sala}</td>
                            <td>{item.capacidade}</td>
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
        </>
    )
}