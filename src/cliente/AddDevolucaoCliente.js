import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddVenda() {

    const navigate = useNavigate()

    const [devCliente, setDevCliente] = useState({
        fkProdutoCodigo: "",
        fkClienteCPF: "",
        fkVendedorCPF: "",
        dataDevolucao: "",
        qtdProduto: ""
    })

    const onInputChange = (e) => {
        const { name, value } = e.target
        setDevCliente({ ...devCliente, [name]: value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/devolucaoClientes/add", devCliente)
        navigate("/devolucaoCliente")
    }

    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [vendedores, setVendedores] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/clientes")
            .then(res => setClientes(res.data))

        axios.get("http://localhost:8080/produtos2")
            .then(res => setProdutos(res.data))

        axios.get("http://localhost:8080/vendedor")
            .then(res => setVendedores(res.data))
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Cadastrar Devolução Cliente</h2>

                    <Link className="btn btn-success mb-2" to="/addvendasitens">Adicionar</Link>

                    <form onSubmit={onSubmit}>

                        <div className='mb-3'>
                            <label className='form-label'>Código do Produto</label>
                            <select
                                className='form-select'
                                name='fkProdutoCodigo'
                                value={devCliente.fkProdutoCodigo}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                {produtos.map(p => (
                                    <option key={p.codigo} value={p.codigo}>{p.nome} - {p.codigo}</option>
                                ))}
                            </select>

                            <label className='form-label mt-3'>CPF do Cliente</label>
                            <select
                                className='form-select'
                                name='fkClienteCPF'
                                value={devCliente.fkClienteCPF}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                {clientes.map(c => (
                                    <option key={c.cpf} value={c.cpf}>{c.nome} - {c.cpf}</option>
                                ))}
                            </select>

                            <label className='form-label mt-3'>CPF do Vendedor</label>
                            <select
                                className='form-select'
                                name='fkVendedorCPF'
                                value={devCliente.fkVendedorCPF}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                {vendedores.map(v => (
                                    <option key={v.funcionario.cpf} value={v.funcionario.cpf}>
                                        {v.funcionario.nome} - {v.funcionario.cpf}
                                    </option>
                                ))}
                            </select>

                            <label className='form-label mt-3'>Data da Devolução</label>
                            <input
                                type="date"
                                className='form-control'
                                name='dataDevolucao'
                                value={devCliente.dataDevolucao}
                                onChange={onInputChange}
                                required
                            />

                            <label className='form-label mt-3'>Quantidade de Produtos</label>
                            <input
                                type="number"
                                className='form-control'
                                name='qtdProduto'
                                value={devCliente.qtdProduto}
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
