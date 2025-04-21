import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddVenda() {

    const navigate = useNavigate()

    const [venda, setVenda] = useState({
        idVenda: "",
        dataVenda: "",
        valorSubtotal: "",
        fkVendedorCPF: "",
        fkProdutoCodigo: "",
        fkClienteCPF: ""
    })

    const onInputChange = (e) => {
        const { name, value } = e.target
        setVenda({ ...venda, [name]: value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const vendaComData = {
            ...venda,
            dataVenda: new Date().toISOString().split('T')[0] // yyyy-MM-dd
        }
        await axios.post("http://localhost:8080/vendas/add", vendaComData)
        navigate("/venda")
    }


    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [vendedores, setVendedores] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/clientes")
            .then(res => setClientes(res.data));

        axios.get("http://localhost:8080/produtos2")
            .then(res => setProdutos(res.data));

        axios.get("http://localhost:8080/vendedor")
            .then(res => setVendedores(res.data));
    }, []);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Cadastrar Venda</h2>

                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>ID da Venda</label>
                            <input
                                type="text"
                                className='form-control'
                                name='idVenda'
                                value={venda.idVenda}
                                onChange={onInputChange}
                                required
                            />

                            <label className='form-label'>Valor Subtotal</label>
                            <input
                                type="number"
                                step="0.01"
                                className='form-control'
                                name='valorSubtotal'
                                value={venda.valorSubtotal}
                                onChange={onInputChange}
                                required
                            />

                            <label className='form-label'>CPF do Vendedor</label>
                            <select
                                className='form-select'
                                name='fkVendedorCPF'
                                value={venda.fkVendedorCPF}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                {vendedores.map(v => (
                                    <option key={v.funcionario.cpf} value={v.funcionario.cpf}>
                                        {v.funcionario.nome} - {v.funcionario.cpf}</option>
                                ))}
                            </select>

                            <label className='form-label'>Código do Produto</label>
                            <select
                                className='form-select'
                                name='fkProdutoCodigo'
                                value={venda.fkProdutoCodigo}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                {produtos.map(p => (
                                    <option key={p.codigo} value={p.codigo}>{p.nome} - {p.codigo}</option>
                                ))}
                            </select>

                            <label className='form-label'>CPF do Cliente</label>
                            <select
                                className='form-select'
                                name='fkClienteCPF'
                                value={venda.fkClienteCPF}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                {clientes.map(c => (
                                    <option key={c.cpf} value={c.cpf}>{c.nome} - {c.cpf}</option>
                                ))}
                            </select>

                        </div>

                        <Link to="/venda" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
