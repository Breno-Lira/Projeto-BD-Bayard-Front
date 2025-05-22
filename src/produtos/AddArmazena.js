import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddArmazena() {
    const navigate = useNavigate();

    const [armazena, setArmazena] = useState({
        estoquista_cpf: "",
        codigo_produto: "",
        qtdArmazenada: "",
        armazena_id: ""
    });

    const { estoquista_cpf, codigo_produto, qtdArmazenada, armazena_id } = armazena;

    const [estoquistas, setEstoquistas] = useState([]);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        carregarEstoquistas();
        carregarProdutos();
    }, []);

    const carregarEstoquistas = async () => {
        try {
            const result = await axios.get("http://localhost:8080/estoquista");
            setEstoquistas(result.data);
        } catch (error) {
            console.error("Erro ao carregar estoquistas:", error);
        }
    };

    const carregarProdutos = async () => {
        try {
            const result = await axios.get("http://localhost:8080/produtos2");
            setProdutos(result.data);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
        }
    };

    const onInputChange = (e) => {
        setArmazena({ ...armazena, [e.target.name]: e.target.value });
    };

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
                            <label htmlFor='estoquista_cpf' className='form-label'>Estoquista (CPF)</label>
                            <select
                                className='form-select'
                                name='estoquista_cpf'
                                value={estoquista_cpf}
                                onChange={onInputChange}
                                required
                            >
                                <option value="">Selecione o estoquista</option>
                                {estoquistas.map((e) => (
                                    <option key={e.funcionario.cpf} value={e.funcionario.cpf}>
                                        {e.funcionario.nome} - CPF: {e.funcionario.cpf}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor='codigo_produto' className='form-label mt-3'>Produto</label>
                            <select
                                className='form-select'
                                name='codigo_produto'
                                value={codigo_produto}
                                onChange={onInputChange}
                                required
                            >
                                <option value="">Selecione o produto</option>
                                {produtos.map((p) => (
                                    <option key={p.codigo} value={p.codigo}>
                                        {p.nome} - Codigo: {p.codigo}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor='qtdArmazenada' className='form-label mt-3'>Quantidade de Produtos Armazenados</label>
                            <input
                                type="number"
                                className='form-control'
                                name='qtdArmazenada'
                                value={qtdArmazenada}
                                onChange={onInputChange}
                                required
                                min={0}
                            />

                            <label htmlFor='armazena_id' className='form-label mt-3'>ID do Armazenamento</label>
                            <input
                                type="text"
                                className='form-control'
                                name='armazena_id'
                                value={armazena_id}
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <Link to="/armazena" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}