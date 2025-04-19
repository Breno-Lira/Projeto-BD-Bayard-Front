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

    return (
        <div className='container'>

            <h1 className='text-center mt-4'>Vestuários</h1>

            <Link className="btn btn-success mb-3" to="/addvestuario">Adicionar</Link>

            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Cor</th>
                            <th scope="col">Preço</th>
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
                                    <td>{vestuario.produto.cor}</td>
                                    <td>R$ {vestuario.produto.preco.toFixed(2)}</td>
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
