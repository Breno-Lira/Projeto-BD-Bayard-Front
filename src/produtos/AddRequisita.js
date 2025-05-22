import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddRequisita() {

    const navigate = useNavigate()

    const [requisita, setRequisita] = useState({
        codigoReq: "",
        estoquista_cpf: "",
        codigoProduto: "", 
        fornecedorCnpj: "",
        qtdProduto: ""
    })

    const {codigoReq , estoquista_cpf , codigoProduto, fornecedorCnpj, qtdProduto} = requisita

    const onInputChange = (e) => {
        setRequisita({ ...requisita, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/requisita/add", requisita);
        navigate("/requisita");
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Cadastrar Requisição</h2>

                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='codigoReq' className='form-label'>Codigo da Requisição</label>
                            <input
                                type="text"
                                className='form-control'
                                name='codigoReq'
                                placeholder='Digite o Codigo da Requisição'
                                value={codigoReq}
                                onChange={onInputChange}
                                required
                            />

                            <label htmlFor='codigoProduto' className='form-label mt-2'>Código do Produto</label>
                            <input
                                type="text"
                                className='form-control'
                                name='codigoProduto'
                                placeholder='Digite o código do produto'
                                value={codigoProduto}
                                onChange={onInputChange}
                                required
                            />

                            <label htmlFor='qtdProduto' className='form-label mt-2'>Quantidade de Produtos</label>
                            <input
                                type="text"
                                className='form-control'
                                name='qtdProduto'
                                placeholder='Digite a quantidade de produtos'
                                value={qtdProduto}
                                onChange={onInputChange}
                                required
                            />

                            <label htmlFor='estoquista_cpf' className='form-label mt-2'>Cpf do Estoquista</label>
                            <input
                                type="text"
                                className='form-control'
                                name='estoquista_cpf'
                                placeholder='Digite um Cpd o Estoquista'
                                value={estoquista_cpf}
                                onChange={onInputChange}
                                required
                            />

                            <label htmlFor='fornecedorCnpj' className='form-label mt-2'>Cnpj do Fornecedor</label>
                            <input
                                type="text"
                                className='form-control'
                                name='fornecedorCnpj'
                                placeholder='Digite o Cnpj do Fornecedor'
                                value={fornecedorCnpj}
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
