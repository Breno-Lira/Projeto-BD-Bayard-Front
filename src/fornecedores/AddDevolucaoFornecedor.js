import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddDevolucaoFornecedor() {

    const navigate = useNavigate()

    const [devFornecedor, setDevFornecedor] = useState({
        estoquistaCpf: "",
        fornecedorCnpj: "",
        codigoProduto: "",
        devData: "",
        qtdProduto: ""
    })

    const onInputChange = (e) => {
        const { name, value } = e.target
        setDevFornecedor({ ...devFornecedor, [name]: value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/devolucaoFornecedores/add", devFornecedor)
        navigate("/devolucaoFornecedor")
    }

    const [estoquista, setEstoquista] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/estoquista")
            .then(res => setEstoquista(res.data))

        axios.get("http://localhost:8080/fornecedores")
            .then(res => setFornecedores(res.data))

        axios.get("http://localhost:8080/produtos2")
            .then(res => setProdutos(res.data))
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Cadastrar Devolução Fornecedor</h2>

                    <form onSubmit={onSubmit}>

                        <div className='mb-3'>
                            <label className='form-label mt-3'>CPF do Estoquista</label>
                            <select
                                className='form-select'
                                name='estoquistaCpf'
                                value={devFornecedor.estoquistaCpf}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                {estoquista.map(e => (
                                    <option key={e.funcionario.cpf} value={e.funcionario.cpf}>Estoquista: {e.funcionario.nome} / {e.funcionario.cpf}</option>
                                ))}
                            </select>

                            <label className='form-label mt-3'>CNPJ do Fornecedor</label>
                            <select
                                className='form-select'
                                name='fornecedorCnpj'
                                value={devFornecedor.fornecedorCnpj}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                {fornecedores.map(f => (
                                    <option key={f.cnpj} value={f.cnpj}>
                                        Fornecedor: {f.nome} / {f.cnpj}
                                    </option>
                                ))}
                            </select>

                            <label className='form-label'>Código do Produto</label>
                            <select
                                className='form-select'
                                name='codigoProduto'
                                value={devFornecedor.codigoProduto}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                {produtos.map(p => (
                                    <option key={p.codigo} value={p.codigo}>{p.nome} - {p.codigo}</option>
                                ))}
                            </select>

                            <label className='form-label mt-3'>Data da Devolução</label>
                            <input
                                type="date"
                                className='form-control'
                                name='devData'
                                value={devFornecedor.devData}
                                onChange={onInputChange}
                                required
                            />

                            <label className='form-label mt-3'>Quantidade de Produtos</label>
                            <input
                                type="number"
                                className='form-control'
                                name='qtdProduto'
                                value={devFornecedor.qtdProduto}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <Link to="/devolucaoCliente" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
