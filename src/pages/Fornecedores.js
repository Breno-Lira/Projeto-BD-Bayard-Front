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

    return (
        <div className='conteiner'>

            <h1 className='text-center mt-4'>Fornecedores</h1>

            <Link className="btn btn-success" to="/addfornecedor">Adicionar</Link>

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
