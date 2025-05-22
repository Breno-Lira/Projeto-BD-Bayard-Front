import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddEstoquista() {

    const navigate = useNavigate()

    const [estoquista, setEstoquista] = useState({
        cpf: "",
        telefone1: "",
        telefone2: "",
        nome: "",
        VendedorResponsavel: false,
        chefia: false,
        ativo: true,
        dataUltimoInventario: "",
        acessoEstoque: ""
    })

    const { cpf, telefone1, telefone2, nome, VendedorResponsavel, chefia, ativo, dataUltimoInventario, acessoEstoque } = estoquista

    const onInputChange = (e) => {
        setEstoquista({ ...estoquista, [e.target.name]: e.target.value })
    }

    const onCheckboxChange = (e) => {
        setEstoquista({ ...estoquista, [e.target.name]: e.target.checked })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const estoquistaPayload = {
            funcionario: {
                cpf: estoquista.cpf,
                telefone1: estoquista.telefone1,
                telefone2: estoquista.telefone2,
                nome: estoquista.nome,
                vendedorResponsavel: estoquista.VendedorResponsavel,
                chefia: estoquista.chefia,
                ativo: estoquista.ativo
            },
            dataUltimoInventario: (estoquista.dataUltimoInventario),
            acessoEstoque: (estoquista.acessoEstoque)
        };

        await axios.post("http://localhost:8080/estoquista/add", estoquistaPayload);
        navigate("/estoquista");
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Cadastrar Estoquista</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='cpf' className='form-label'>Cpf</label>
                            <input
                                type="text"
                                className='form-control'
                                name='cpf'
                                placeholder='Digite o Cpf do estoquista'
                                value={cpf}
                                onChange={(e) => onInputChange(e)}
                                required
                            />

                            <label htmlFor='nome' className='form-label mt-2'>Nome</label>
                            <input
                                type="text"
                                className='form-control'
                                name='nome'
                                placeholder='Digite o Nome do estoquista'
                                value={nome}
                                onChange={(e) => onInputChange(e)}
                                required
                            />

                            <label htmlFor='telefone1' className='form-label mt-2'>Telefone1</label>
                            <input
                                type="text"
                                className='form-control'
                                name='telefone1'
                                placeholder='Digite o telefone do estoquista'
                                value={telefone1}
                                onChange={(e) => onInputChange(e)}
                                required
                            />

                            <label htmlFor='telefone2' className='form-label mt-2'>Telefone2</label>
                            <input
                                type="text"
                                className='form-control'
                                name='telefone2'
                                placeholder='Digite o telefone do estoquista'
                                value={telefone2}
                                onChange={(e) => onInputChange(e)}
                            />

                            <label htmlFor='dataUltimoInventario' className='form-label mt-2'>Data do último inventário</label>
                            <input
                                type="date"
                                className='form-control'
                                name='dataUltimoInventario'
                                placeholder='Escolha a data do último inventário'
                                value={dataUltimoInventario}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='acessoEstoque' className='form-label mt-2'>Acesso ao Estoque</label>
                            <input
                                type="text"
                                className='form-control'
                                name='acessoEstoque'
                                placeholder='Tem acesso ao estoque'
                                value={acessoEstoque}
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

                        <Link to="/estoquista" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}