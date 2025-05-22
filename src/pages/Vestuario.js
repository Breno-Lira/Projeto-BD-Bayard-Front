import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function Vestuarios() {

    const [vestuarios, setVestuarios] = useState([])

    const { codigo } = useParams()

    useEffect(() => {
        loadVestuarios()
    }, [])

    const loadVestuarios = async () => {
        const result = await axios.get("http://localhost:8080/vestuario")
        setVestuarios(result.data)
    }

    const deleteVestuario = async (codigo) => {
        await axios.delete(`http://localhost:8080/vestuario/delete/${codigo}`)
        loadVestuarios()
    }

    const [search, setSearch] = useState("");

    const handleSearchChange = async (e) => {
        const termo = e.target.value;
        setSearch(termo);

        if (termo.trim() === "") {
            loadVestuarios(); // volta lista completa
        } else {
            try {
                const res = await axios.get(`http://localhost:8080/vestuario/buscar?termo=${termo}`);
                if (res.status === 204) {
                    setVestuarios([]); // limpa lista se não encontrou ninguém
                } else {
                    setVestuarios(res.data);
                }
            } catch (error) {
                console.error("Erro na busca:", error);
            }
        }
    };

    return (
        <div className='container'>

            <h1 className='text-center mt-4'>Vestuários</h1>

            <Link className="btn btn-success mb-3" to="/addvestuario">Adicionar</Link>

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
                            <th scope="col">Gênero</th>
                            <th scope="col">Tamanho</th>
                            <th scope="col">Faixa Etária</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vestuarios.map((vestuario, index) => (
                                <tr key={index}>
                                    <td>{vestuario.produto.codigo}</td>
                                    <td>{vestuario.produto.nome}</td>
                                    <td>{vestuario.produto.cor_primaria}</td>
                                    <td>{vestuario.produto.cor_secundaria}</td>
                                    <td>R$ {vestuario.produto.preco.toFixed(2)}</td>
                                     <td>{vestuario.produto.qtdProduto}</td>
                                    <td>{vestuario.genero}</td>
                                    <td>{vestuario.tamanho}</td>
                                    <td>{vestuario.faixaEtaria}</td>
                                    <td>
                                        <Link
                                            className='btn btn-outline-primary mx-2'
                                            to={`/editvestuario/${vestuario.produto.codigo}`}
                                        >
                                            Editar
                                        </Link>

                                        <button
                                            className='btn btn-danger mx-2'
                                            onClick={() => deleteVestuario(vestuario.produto.codigo)}
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
