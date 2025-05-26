import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function Estoquista() {
    const [users, setUsers] = useState([])

    const { cpf } = useParams()

    useEffect(() => {
        loadUsers();
    }, [])

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/estoquista")
        setUsers(result.data)
    }


    const deleteUser = async (cpf) => {
        try {
            await axios.delete(`http://localhost:8080/estoquista/delete/${cpf}`);
            loadUsers();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data);
            } else {
                alert("Erro ao excluir Caixa.");
            }
        }
    }

    const [search, setSearch] = useState("");

    const handleSearchChange = async (e) => {
        const termo = e.target.value;
        setSearch(termo);

        if (termo.trim() === "") {
            loadUsers(); // volta lista completa
        } else {
            try {
                const res = await axios.get(`http://localhost:8080/estoquista/buscar?termo=${termo}`);
                if (res.status === 204) {
                    setUsers([]); // limpa lista se não encontrou ninguém
                } else {
                    setUsers(res.data);
                }
            } catch (error) {
                console.error("Erro na busca:", error);
            }
        }
    };

    return (
        <div className='conteiner'>

            <h1 className='text-center mt-4'>Estoquista</h1>

            <Link className="btn btn-success" to="/addEstoquista">Adicionar</Link>

            <div className="px-3">
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Buscar por nome ou CPF"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Cpf</th>
                            <th scope="col">Telefone1</th>
                            <th scope="col">Telefone2</th>
                            <th scope="col">Nome</th>
                            <th scope="col">vendedorResponsavel</th>
                            <th scope="col">chefia</th>
                            <th scope="col">ativo</th>
                            <th scope="col">dataUltimoInventario</th>
                            <th scope="col">acessoEstoque</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.funcionario.cpf}</td>
                                <td>{user.funcionario.telefone1}</td>
                                <td>{user.funcionario.telefone2}</td>
                                <td>{user.funcionario.nome}</td>
                                <td>{user.funcionario.vendedorResponsavel ? 'Sim' : 'Não'}</td>
                                <td>{user.funcionario.chefia ? 'Sim' : 'Não'}</td>
                                <td>{user.funcionario.ativo ? 'Sim' : 'Não'}</td>
                                <td>{user.dataUltimoInventario}</td>
                                <td>{user.acessoEstoque ? 'Sim' : 'Não'}</td>
                                <td>
                                    <Link className='btn btn-outline-primary mx-2' to={`/editEstoquista/${user.funcionario.cpf}`}>Editar</Link>
                                    <button className='btn btn-danger mx-2' onClick={() => deleteUser(user.funcionario.cpf)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}