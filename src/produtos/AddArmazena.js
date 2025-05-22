import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddArmazena() {

    const navigate = useNavigate()

    const [armazena, setArmazena] = useState({
        estoquista_cpf: "",
        codigo_produto: "",
        qtdArmazena: "", 
        armazena_id: ""
    })

    const { estoquista_cpf, codigo_produto, qtdArmazena, armazena_id } = armazena

    const onInputChange = (e) => {
        setArmazena({ ...armazena, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/armazena/add", armazena);
        navigate("/armazena");
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Cadastrar Armazenamento</h2>

                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='estoquista_cpf' className='form-label'>Cpf do Estoquista</label>
                            <input
                                type="text"
                                className='form-control'
                                name='estoquista_cpf'
                                placeholder='Digite o Cpf do estoquista'
                                value={estoquista_cpf}
                                onChange={onInputChange}
                                required
                            />

                            <label htmlFor='codigo_produto' className='form-label mt-2'>Código do Produto</label>
                            <input
                                type="text"
                                className='form-control'
                                name='codigo_produto'
                                placeholder='Digite o código do produto'
                                value={codigo_produto}
                                onChange={onInputChange}
                                required
                            />

                            <label htmlFor='qtdArmazena' className='form-label mt-2'>Quantidade de Produtos Armazenados</label>
                            <input
                                type="text"
                                className='form-control'
                                name='qtdArmazena'
                                placeholder='Digite a quantidade de produtos armazenados'
                                value={qtdArmazena}
                                onChange={onInputChange}
                                required
                            />

                            <label htmlFor='armazena_id' className='form-label mt-2'>ID do Armazenamento</label>
                            <input
                                type="text"
                                className='form-control'
                                name='armazena_id'
                                placeholder='Digite um ID para o Armazenamento'
                                value={armazena_id}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <Link to="/caixa" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
