import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Fornecedores() {

    
    const [users, setUsers] = useState([])

    const { cnpj } = useParams()

    useEffect(() => {
        loadUsers();
    }, [])

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/fornecedores")
        setUsers(result.data)
    }

    const deleteUser = async (cnpj) => {
        await axios.delete(`http://localhost:8080/fornecedores/delete/${cnpj}`)
        loadUsers()
    }

    const [search, setSearch] = useState("");

    const handleSearchChange = async (e) => {
        const termo = e.target.value;
        setSearch(termo);

        if (termo.trim() === "") {
            loadUsers(); // volta lista completa
        } else {
            try {
                const res = await axios.get(`http://localhost:8080/fornecedores/buscar?termo=${termo}`);
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

            <h1 className='text-center mt-4'>Fornecedores</h1>

            <Link className="btn btn-success" to="/addfornecedor">Adicionar</Link>

            <div className="px-3">
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Buscar por nome ou CNPJ"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Cnpj</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Transportadora</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <td>{user.cnpj}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.transportaadora}</td>
                                    <td>
                                    <Link
                                            className='btn btn-outline-primary mx-2'
                                            to={`/editfornecedor/${user.cnpj}`}
                                        >Editar</Link>


                                        <button
                                            className='btn btn-danger mx-2'
                                            onClick={() => deleteUser(user.cnpj)}

                                        >
                                            Delete</button>

                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>

        </div>
    )
}
