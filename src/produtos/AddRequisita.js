import React, { useState, useEffect } from 'react'
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

    const [estoquista, setEstoquista] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [fornecedor, setFornecedor] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/estoquista")
            .then(res => setEstoquista(res.data));

        axios.get("http://localhost:8080/produtos2")
            .then(res => setProdutos(res.data));

        axios.get("http://localhost:8080/fornecedores")
            .then(res => setFornecedor(res.data));
    }, []);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Cadastrar Requisição</h2>

                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>

                            <label className='form-label'>Código do Produto</label>
                            <select
                                className='form-select'
                                name='codigoProduto'
                                value={requisita.codigoProduto}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                {produtos.map(p => (
                                    <option key={p.codigo} value={p.codigo}>{p.nome} - {p.codigo}</option>
                                ))}
                            </select>

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

                            <label className='form-label'>CPF do estoquista</label>
                            <select
                                className='form-select'
                                name='estoquista_cpf'
                                value={requisita.estoquista_cpf}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                {estoquista.map(e => (
                                    <option key={e.funcionario.cpf} value={e.funcionario.cpf}>{e.funcionario.nome} - {e.funcionario.cpf}</option>
                                ))}
                            </select>

                            <label className='form-label'>CNPJ do fornecedor</label>
                            <select
                                className='form-select'
                                name='fornecedorCnpj'
                                value={requisita.fornecedorCnpj}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                {fornecedor.map(f => (
                                    <option key={f.cnpj} value={f.cnpj}>{f.nome} - {f.cnpj}</option>
                                ))}
                            </select>
                        </div>

                        <Link to="/requisita" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
