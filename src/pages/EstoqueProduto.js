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
            <Link className='btn btn-success' to="/addestoqueProduto">Adicionar</Link>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Codigo produto</th>
                        <th>Quantidade de produtos</th>
                    </tr>
                </thead>
                <tbody>
                    {estoqueProduto.map((estoque_produto, index) => (
                        <tr key={index}>
                            <td>{estoque_produto.id_estoque}</td>
                            <td>{estoque_produto.codigo_produto}</td>
                            <td>{estoque_produto.quantidade_produtos}</td>
                            <td>    
                                <Link
                                    className='btn btn-outline-primary mx-2'
                                    to={`/editestoqueProduto/${estoque_produto.id_estoque}`}
                                >
                                    Editar
                                </Link>

                                
                                <button onClick={() => deleteEstoqueProduto(estoque_produto.id_estoque)} className='btn btn-danger btn-sm'>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
