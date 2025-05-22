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

    const [search, setSearch] = useState("");

    const handleSearchChange = async (e) => {
        const termo = e.target.value;
        setSearch(termo);

        if (termo.trim() === "") {
            loadProdutos(); // volta lista completa
        } else {
            try {
                const res = await axios.get(`http://localhost:8080/produtos/buscar?termo=${termo}`);
                if (res.status === 204) {
                    setProdutos([]); // limpa lista se não encontrou ninguém
                } else {
                    setProdutos(res.data);
                }
            } catch (error) {
                console.error("Erro na busca:", error);
            }
        }
    };

    
    return (
        <div className='container'>

            <h1 className='text-center mt-4'>Produtos</h1>

            <Link className="btn btn-success" to="/addproduto">Adicionar</Link>

            <div className="px-3">
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Buscar por nome ou CPF"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Cor1</th>
                            <th scope="col">Cor2</th>
                            <th scope="col">Preço</th>
                            <th scope="col">QtdProduto</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            produtos.map((produto, index) => (
                                <tr key={index}>
                                    <td>{produto.codigo}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.cor_primaria}</td>
                                    <td>{produto.cor_secundaria}</td>
                                    <td>R$ {produto.preco.toFixed(2)}</td>
                                    <td>{produto.qtdProduto}</td>
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

