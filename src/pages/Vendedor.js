import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function Vendedor(){
    const [users, setUsers] = useState([])

    const { cpf } = useParams()

    useEffect(() => {
        loadUsers();
    }, [])

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/vendedor")
        setUsers(result.data)
    }

    const deleteUser = async (cpf) => {
        await axios.delete(`http://localhost:8080/vendedor/delete/${cpf}`)
        loadUsers()
    }

    return (
        <div className='conteiner'>

            <h1 className='text-center mt-4'>Vendedores</h1>

            <Link className="btn btn-success" to="/addVendedor">Adicionar</Link>

            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Cpf</th>
                            <th scope="col">Telefone</th>
                            <th scope="col">Nome</th>
                            <th scope="col">vendedorResponsavel</th>
                            <th scope="col">chefia</th>
                            <th scope="col">numVenda</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                            <td>{user.funcionario.cpf}</td>
                            <td>{user.funcionario.telefone}</td>
                            <td>{user.funcionario.nome}</td>
                            <td>{user.funcionario.vendedorResponsavel ? 'Sim' : 'Não'}</td>
                            <td>{user.funcionario.chefia ? 'Sim' : 'Não'}</td>
                            <td>{user.numVenda}</td>
                            <td>
                                <Link className='btn btn-outline-primary mx-2' to={`/editVendedor/${user.funcionario.cpf}`}>Editar</Link>
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