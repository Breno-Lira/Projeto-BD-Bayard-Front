import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditCaixa() {

    const navigate = useNavigate();
    const { cpf } = useParams();

    const [caixa, setCaixa] = useState({
        funcionario: {
            cpf: "",
            telefone: "",
            nome: "",
            vendedorResponsavel: false,
            chefia: false
        },
        login: "",
        senha: ""
    });

    const { telefone, nome, vendedorResponsavel, chefia } = caixa.funcionario;
    const { login, senha } = caixa;

    useEffect(() => {
        loadCaixa();
    }, []);

    const loadCaixa = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/caixa/${cpf}`);
            console.log(result.data);
            setCaixa(result.data);
        } catch (error) {
            console.error("Erro ao carregar caixa:", error);
        }
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'login' || name === 'senha') {
            setCaixa(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            setCaixa(prevState => ({
                ...prevState,
                funcionario: {
                    ...prevState.funcionario,
                    [name]: value
                }
            }));
        }
    };

    const onCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCaixa(prevState => ({
            ...prevState,
            funcionario: {
                ...prevState.funcionario,
                [name]: checked
            }
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const caixaPayload = {
            funcionario: {
                cpf: caixa.funcionario.cpf,
                telefone: caixa.funcionario.telefone,
                nome: caixa.funcionario.nome,
                vendedorResponsavel: caixa.funcionario.vendedorResponsavel,
                chefia: caixa.funcionario.chefia
            },
            login: (caixa.login),
            senha: (caixa.senha)
        };

        try {
            await axios.put(`http://localhost:8080/caixa/editar/${cpf}`, caixaPayload);
            navigate("/caixa");
        } catch (error) {
            console.error("Erro ao atualizar caixa:", error);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Editar Caixa</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='cpf' className='form-label'>Cpf</label>
                            <input
                                type="text"
                                className='form-control'
                                name='cpf'
                                placeholder='Digite o Cpf do caixa'
                                value={caixa.funcionario.cpf}
                                onChange={(e) => onInputChange(e)}
                                disabled
                            />

                            <label htmlFor='nome' className='form-label mt-2'>Nome</label>
                            <input
                                type="text"
                                className='form-control'
                                name='nome'
                                placeholder='Digite o Nome do caixa'
                                value={nome}
                                onChange={(e) => onInputChange(e)}
                                required
                            />

                            <label htmlFor='telefone' className='form-label mt-2'>Telefone</label>
                            <input
                                type="text"
                                className='form-control'
                                name='telefone'
                                placeholder='Digite o telefone do caixa'
                                value={telefone}
                                onChange={(e) => onInputChange(e)}
                                required
                            />

                            <label htmlFor='login' className='form-label mt-2'>Login</label>
                            <input
                                type="text"
                                className='form-control'
                                name='login'
                                placeholder='Digite o login do caixa'
                                value={login}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                             <label htmlFor='senha' className='form-label mt-2'>Senha</label>
                            <input
                                type="text"
                                className='form-control'
                                name='senha'
                                placeholder='Digite o número de vendas desse caixa'
                                value={senha}
                                onChange={(e) => onInputChange(e)}
                                required
                            />

                            <div className="form-check form-check-inline mt-3">
                                <label className="form-check-label me-2" htmlFor="vendedorResponsavel">
                                    Vendedor Responsável
                                </label>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="vendedorResponsavel"
                                    checked={vendedorResponsavel}
                                    onChange={(e) => onCheckboxChange(e)}
                                    id="vendedorResponsavel"
                                />
                            </div>

                            <div className="form-check form-check-inline">
                                <label className="form-check-label me-2" htmlFor="chefia">
                                    Chefia
                                </label>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="chefia"
                                    checked={chefia}
                                    onChange={(e) => onCheckboxChange(e)}
                                    id="chefia"
                                />
                            </div>

                        </div>

                        <Link to="/caixa" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}