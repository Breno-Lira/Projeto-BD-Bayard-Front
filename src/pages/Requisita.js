import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function Requisita() {

    const [requisita, setRequisita] = useState([])

    const {codigoReq} = useParams()

    useEffect(() => {
        loadRequisita()
    }, [])

    const loadRequisita = async () => {
        const result = await axios.get("http://localhost:8080/requisita")
        setRequisita(result.data)
    }

    const deleteRequisita = async (codigoReq) => {
        await axios.delete(`http://localhost:8080/requisita/delete/${codigoReq}`)
        loadRequisita()
    }

    return (
        <div className='container'>

            <h1 className='text-center mt-4'>requisições</h1>

            <Link className="btn btn-success" to="/addrequisita">Adicionar</Link>

            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Codigo da Requisição</th>
                            <th scope="col">Cpf do Estoquista</th>
                            <th scope="col">Codigo do Produto</th>
                            <th scope="col">Cnpj do Fornecedor</th>
                            <th scope="col">Quantidade de Produtos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requisita.map((requisita, index) => (
                                <tr key={index}>
                                    <td>{requisita.codigoReq}</td>
                                    <td>{requisita.estoquistaCpf}</td>
                                    <td>{requisita.codigoProduto}</td>
                                    <td>{requisita.fornecedorCnpj}</td>
                                    <td>{requisita.qtdProduto}</td>
                                    <td>
                                        
                                        <button
                                            className='btn btn-danger mx-2'
                                            onClick={() => deleteRequisita(requisita.codigoReq)}
                                        >
                                            Delete
                                        </button>
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

