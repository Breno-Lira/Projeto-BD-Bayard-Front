// EstoqueProduto.js
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function EstoqueProduto() {

    const [estoqueProduto, setEstoqueProduto] = useState([])

    useEffect(() => {
        loadEstoqueProduto()
    }, [])

    const loadEstoqueProduto = async () => {
        const result = await axios.get("http://localhost:8080/estoque_produto")
        setEstoqueProduto(result.data)
    }

    const deleteEstoqueProduto= async (id_estoque) => {
        await axios.delete(`http://localhost:8080/estoque_produto/delete/${id_estoque}`)
        loadEstoqueProduto()
    }

    return (
        <div className='container mt-4'>
            <h2 className='text-center mb-4'>Estoque Produtos</h2>
            <div className="mb-4 text-center">
                <Link className='btn btn-success btn-lg' to="/addestoqueProduto">Adicionar</Link>
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-bordered border shadow text-center align-middle fs-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Código Produto</th>
                            <th scope="col">Quantidade de Produtos</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estoqueProduto.map((estoque_produto, index) => (
                            <tr key={index}>
                                <td>{estoque_produto.id_estoque}</td>
                                <td>{estoque_produto.codigo_produto}</td>
                                <td>{estoque_produto.quantidade_produtos}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>
                                    <Link
                                        className='btn btn-outline-primary mx-2'
                                        to={`/editestoqueProduto/${estoque_produto.id_estoque}`}
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => deleteEstoqueProduto(estoque_produto.id_estoque)}
                                        className='btn btn-danger'
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
