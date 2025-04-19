import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function EditProduto() {

    const navigate = useNavigate()
    const { codigo: codigoParam } = useParams()

    const [produto, setProduto] = useState({
        codigo: "",
        nome: "",
        cor: "",
        preco: ""
    })

    const { codigo, nome, cor, preco } = produto

    useEffect(() => {
        loadProduto()
    }, [])

    const loadProduto = async () => {
        const result = await axios.get(`http://localhost:8080/produtos/${codigoParam}`)
        setProduto(result.data)
    }

    const onInputChange = (e) => {
        setProduto({ ...produto, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8080/produtos/editar/${codigoParam}`, produto)
        navigate("/produtos")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Editar Produto</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='codigo' className='form-label'>Código</label>
                            <input
                                type="text"
                                className='form-control'
                                name='codigo'
                                value={codigo}
                                disabled
                            />
                            <label htmlFor='nome' className='form-label'>Nome</label>
                            <input
                                type="text"
                                className='form-control'
                                name='nome'
                                value={nome}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                            <label htmlFor='cor' className='form-label'>Cor</label>
                            <input
                                type="text"
                                className='form-control'
                                name='cor'
                                value={cor}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='preco' className='form-label'>Preço</label>
                            <input
                                type="number"
                                step="0.01"
                                className='form-control'
                                name='preco'
                                value={preco}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>

                        <Link to="/produtos" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
