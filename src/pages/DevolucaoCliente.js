import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function DevolucaoCliente(){
    const [devclient, setDevCliente] = useState([])

    useEffect(() => {
        loadDevCliente();
    }, [])

    const loadDevCliente = async () => {
        const result = await axios.get("http://localhost:8080/devolucaoClientes")
        setDevCliente(result.data)
    }

    const deleteDevCliente = async (idDevolucao) => {
        await axios.delete(`http://localhost:8080/devolucaoClientes/delete/${idDevolucao}`)
        loadDevCliente()
    }

    return (
        <div className='conteiner'>

            <h1 className='text-center mt-4'>Devolução de Clientes</h1>

            <Link className="btn btn-success" to="/adddevolucaoCliente">Adicionar</Link>

            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Id da Devolução</th>
                            <th scope="col">Código Produto</th>
                            <th scope="col">CPF Cliente</th>
                            <th scope="col">CPF Vendedor</th>
                            <th scope="col">Data Devolução</th>
                            <th scope="col">Quantidade Produto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devclient.map((item, index) => (
                            <tr key={index}>
                            <td>{item.idDevolucao}</td>
                            <td>{item.fkProdutoCodigo}</td>
                            <td>{item.fkClienteCPF}</td>
                            <td>{item.fkVendedorCPF}</td>
                            <td>{item.dataDevolucao}</td>
                            <td>{item.qtdProduto}</td>
                            <td>
                                <button className='btn btn-danger mx-2' onClick={() => deleteDevCliente(item.idDevolucao)}>Delete</button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}