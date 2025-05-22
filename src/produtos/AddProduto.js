import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddProduto() {

    const navigate = useNavigate()

    const [produto, setProduto] = useState({
        codigo: "",
        nome: "",
        cor_primaria: "",
        cor_secundaria: "",
        preco: ""
    })

    const { codigo, nome, cor_primaria, cor_secundaria, preco } = produto

    const onInputChange = (e) => {
        setProduto({ ...produto, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/produtos/add", produto)
        navigate("/produtos")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Cadastrar Produto</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                          {/*  <label htmlFor='codigo' className='form-label'>Código</label>
                            <input
                                type="text"
                                className='form-control'
                                name='codigo'
                                placeholder='Digite o código do produto'
                                value={codigo}
                                onChange={(e) => onInputChange(e)}
                                required
                            /> */}
                            <label htmlFor='nome' className='form-label'>Nome</label>
                            <input
                                type="text"
                                className='form-control'
                                name='nome'
                                placeholder='Digite o nome do produto'
                                value={nome}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                            <label htmlFor='cor_primaria' className='form-label'>Cor_primaria</label>
                            <input
                                type="text"
                                className='form-control'
                                name='cor_primaria'
                                placeholder='Digite a cor_primaria'
                                value={cor_primaria}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='cor_secundaria' className='form-label'>Cor_secundaria</label>
                            <input
                                type="text"
                                className='form-control'
                                name='cor_secundaria'
                                placeholder='Digite a cor_secundaria'
                                value={cor_secundaria}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='preco' className='form-label'>Preço</label>
                            <input
                                type="number"
                                step="0.01"
                                className='form-control'
                                name='preco'
                                placeholder='Digite o preço'
                                value={preco}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                        </div>

                        <Link to="/produtos" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
