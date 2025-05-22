import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddVenda() {

    const navigate = useNavigate()

    const [repoe, setRepoe] = useState({
        id_estoque_produto: "",
        id_dev_cliente: "",
        estoque_cpf: ""
    })

    const onInputChange = (e) => {
        const { name, value } = e.target
        setRepoe({ ...repoe, [name]: value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id_estoque_produto: repoe.id_estoque_produto,
            id_dev_cliente: repoe.id_dev_cliente,
            estoque_cpf: repoe.estoque_cpf
        };

        await axios.post("http://localhost:8080/repoem/add", payload);
        navigate("/repoe");
    };

    const [estoque_produto, setEstoqueProduto] = useState([]);
    const [devcliente, setDevCliente] = useState([]);
    const [estoquista, setEstoquista] = useState([]);

    useEffect(() => {
        
        axios.get("http://localhost:8080/estoque_produto")
            .then(res => setEstoqueProduto(res.data));

        axios.get("http://localhost:8080/devolucaoClientes")
            .then(res => setDevCliente(res.data));
        
        axios.get("http://localhost:8080/estoquista")
            .then(res => setEstoquista(res.data));
    }, []);
    
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Cadastrar uma Reposição</h2>

                    <form onSubmit={onSubmit}>
                        
                        <div className='mb-3'>

                            <label className='form-label'>Id do Estoque</label>
                                <select
                                    className='form-select'
                                    name='id_estoque_produto'
                                    value={repoe.id_estoque_produto}
                                    onChange={onInputChange}
                                    required
                                    >
                                    <option value="" disabled hidden>Selecione</option>
                                    {estoque_produto.map(ep => (
                                        <option key={ep.id_estoque} value={ep.id_estoque}>
                                            Id do Estoque: {ep.id_estoque}
                                        </option>
                                    ))}
                                </select>

                                <label className='form-label'>Id da Devolução do Cliente</label>
                                    <select
                                    className='form-select'
                                    name='id_dev_cliente'
                                    value={repoe.id_dev_cliente}
                                    onChange={onInputChange}
                                    required
                                    >
                                    <option value="" disabled hidden>Selecione</option>
                                    {devcliente.map(devC => (
                                        <option key={devC.idDevolucao} value={devC.idDevolucao}>
                                            Id da Devolução: {devC.idDevolucao}
                                        </option>
                                    ))}
                                </select>

                                <label className='form-label'>CPF do Estoquista</label>
                                    <select
                                    className='form-select'
                                    name='estoque_cpf'
                                    value={repoe.estoque_cpf}
                                    onChange={onInputChange}
                                    required
                                    >
                                    <option value="" disabled hidden>Selecione</option>
                                    {estoquista.map(e => (
                                        <option key={e.funcionario.cpf} value={e.funcionario.cpf}>
                                        Estoquista: {e.funcionario.nome} / CPF: {e.funcionario.cpf}
                                        </option>
                                    ))}
                                </select>

                        </div>

                        <Link to="/repoe" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
