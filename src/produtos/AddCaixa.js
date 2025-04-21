import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddCaixa() {

    const navigate = useNavigate()

    const [caixa, setCaixa] = useState({
        cpf: "",
        telefone: "",
        nome: "",
        VendedorResponsavel: false,
        chefia: false,
        login: "",
        senha: ""
    })

    const { cpf, telefone, nome, VendedorResponsavel, chefia, login, senha } = caixa

    const onInputChange = (e) => {
        setCaixa({ ...caixa, [e.target.name]: e.target.value })
    }

    const onCheckboxChange = (e) => {
        setCaixa({ ...caixa, [e.target.name]: e.target.checked })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
      
        const caixaPayload = {
          funcionario: {
            cpf: caixa.cpf,
            telefone: caixa.telefone,
            nome: caixa.nome,
            vendedorResponsavel: caixa.VendedorResponsavel,
            chefia: caixa.chefia
          },
          login: (caixa.login),
          senha: (caixa.senha)
        };
      
        await axios.post("http://localhost:8080/caixa/add", caixaPayload);
        navigate("/caixa");
      };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Cadastrar Caixa</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='cpf' className='form-label'>Cpf</label>
                            <input
                                type="text"
                                className='form-control'
                                name='cpf'
                                placeholder='Digite o Cpf do caixa'
                                value={cpf}
                                onChange={(e) => onInputChange(e)}
                                required
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
                                    name="VendedorResponsavel"
                                    checked={VendedorResponsavel}
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
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
