import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Inicio() {

    const [users, setUsers] = useState([])

    const { cpf } = useParams()

    useEffect(() => {
        loadUsers();
    }, [])

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/clientes")
        setUsers(result.data)
    }

    const deleteUser = async (cpf) => {
        await axios.delete(`http://localhost:8080/clientes/delete/${cpf}`)
        loadUsers()
    }

    return (
        <div className='conteiner'>

            <h1 className='text-center mt-4'>Clientes</h1>

            <Link className="btn btn-success" to="/addcliente">Adicionar</Link>

            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Cpf</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Interesse</th>
                            <th scope="col">Dat_nascimento</th>
                            <th scope="col">cidade</th>
                            <th scope="col">bairro</th>
                            <th scope="col">rua</th>
                            <th scope="col">numero</th>
                            <th scope="col">cep</th>
                            <th scope="col">complemento</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <td>{user.cpf}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.interesse}</td>
                                    <td>{user.dataNascimento}</td>
                                    <td>{user.cidade}</td>
                                    <td>{user.bairro}</td>
                                    <td>{user.rua}</td>
                                    <td>{user.numero}</td>
                                    <td>{user.cep}</td>
                                    <td>{user.complemento}</td>
                                    <td>
                                        <Link
                                            className='btn btn-outline-primary mx-2'
                                            to={`/editcliente/${user.cpf}`}
                                        >Editar</Link>


                                        <button
                                            className='btn btn-danger mx-2'
                                            onClick={() => deleteUser(user.cpf)}

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
