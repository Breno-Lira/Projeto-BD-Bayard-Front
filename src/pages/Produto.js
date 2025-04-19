import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function Produtos() {

    const [produtos, setProdutos] = useState([])

    const { codigo } = useParams()

    useEffect(() => {
        loadProdutos()
    }, [])

    const loadProdutos = async () => {
        const result = await axios.get("http://localhost:8080/produtos")
        setProdutos(result.data)
    }

    const deleteProduto = async (codigo) => {
        await axios.delete(`http://localhost:8080/produtos/delete/${codigo}`)
        loadProdutos()
    }

    return (
        <div className='container'>

            <h1 className='text-center mt-4'>Produtos</h1>

            <Link className="btn btn-success" to="/addproduto">Adicionar</Link>

            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Cor</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            produtos.map((produto, index) => (
                                <tr key={index}>
                                    <td>{produto.codigo}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.cor}</td>
                                    <td>R$ {produto.preco.toFixed(2)}</td>
                                    <td>
                                        <Link
                                            className='btn btn-outline-primary mx-2'
                                            to={`/editproduto/${produto.codigo}`}
                                        >
                                            Editar
                                        </Link>

                                        <button
                                            className='btn btn-danger mx-2'
                                            onClick={() => deleteProduto(produto.codigo)}
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

