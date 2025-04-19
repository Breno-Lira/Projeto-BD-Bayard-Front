import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddFornecedor() {

    let navigate = useNavigate()

    const [fornecedor, setFornecedor] = useState({
        cnpj: "",
        nome: "",
        transportaadora: ""
    })

    const { cnpj, nome, transportaadora } = fornecedor

    const onInputChange = (e) => {
        setFornecedor({ ...fornecedor, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/fornecedores/add", fornecedor)
        navigate("/fornecedores")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Cadastrar Fornecedor</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Cnpj' className='form-label'>CNPJ</label>
                            <input
                                type="text"
                                className='form-control'
                                name='cnpj'
                                placeholder='Digite o CNPJ'
                                value={cnpj}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                            <label htmlFor='Nome' className='form-label'>Nome</label>
                            <input
                                type="text"
                                className='form-control'
                                name='nome'
                                placeholder='Digite o nome'
                                value={nome}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                            <label htmlFor='Transportadora' className='form-label'>Transportadora</label>
                            <input
                                type="text"
                                className='form-control'
                                name='transportaadora'
                                placeholder='Digite o nome da transportadora'
                                value={transportaadora}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <Link type='submit' className='btn btn-outline-danger mx-4' to="/fornecedores">Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}