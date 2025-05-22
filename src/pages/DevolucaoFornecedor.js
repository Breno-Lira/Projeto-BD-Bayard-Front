import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function DevolucaoFornecedor(){
    const [devfor, setDevFornecedor] = useState([])

    useEffect(() => {
        loadDevFornecedor();
    }, [])

    const loadDevFornecedor = async () => {
        const result = await axios.get("http://localhost:8080/devolucaoFornecedores")
        setDevFornecedor(result.data)
    }

    const deleteDevFornecedor = async (idDevolucao) => {
        await axios.delete(`http://localhost:8080/devolucaoFornecedores/delete/${idDevolucao}`)
        loadDevFornecedor()
    }

    return (
        <div className='conteiner'>

            <h1 className='text-center mt-4'>Devolução dos Fornecedores</h1>

            <Link className="btn btn-success" to="/addDevolucaoFornecedor">Adicionar</Link>

            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Id da Devolução Fornecedor</th>
                            <th scope="col">CPF do Estoquista</th>
                            <th scope="col">CNPJ do Fornecedor</th>
                            <th scope="col">Código do Produto</th>
                            <th scope="col">Data da Devolução</th>
                            <th scope="col">Quantidade de Produtos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devfor.map((item, index) => (
                            <tr key={index}>
                                <td>{item.idDevFornecedor}</td> 
                                <td>{item.estoquistaCpf}</td>
                                <td>{item.fornecedorCnpj}</td>
                                <td>{item.codigoProduto}</td>
                                <td>{item.devData}</td>
                                <td>{item.qtdProduto}</td>
                                <td>
                                    <button className='btn btn-danger mx-2' onClick={() => deleteDevFornecedor(item.idDevFornecedor)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}