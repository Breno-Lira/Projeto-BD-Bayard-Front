import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddVendedor() {

    const navigate = useNavigate()

    const [vendedor, setVendedor] = useState({
        cpf: "",
        telefone: "",
        nome: "",
        VendedorResponsavel: false,
        chefia: false,
        numVenda: ""
    })

    const { cpf, telefone, nome, VendedorResponsavel, chefia, numVenda } = vendedor

    const onInputChange = (e) => {
        setVendedor({ ...vendedor, [e.target.name]: e.target.value })
    }

    const onCheckboxChange = (e) => {
        setVendedor({ ...vendedor, [e.target.name]: e.target.checked })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
      
        const vendedorPayload = {
          funcionario: {
            cpf: vendedor.cpf,
            telefone: vendedor.telefone,
            nome: vendedor.nome,
            vendedorResponsavel: vendedor.VendedorResponsavel,
            chefia: vendedor.chefia
          },
          numVenda: parseInt(vendedor.numVenda)
        };
      
        await axios.post("http://localhost:8080/vendedor/add", vendedorPayload);
        navigate("/vendedor");
      };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Cadastrar Vendedor</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='cpf' className='form-label'>Cpf</label>
                            <input
                                type="text"
                                className='form-control'
                                name='cpf'
                                placeholder='Digite o Cpf do vendedor'
                                value={cpf}
                                onChange={(e) => onInputChange(e)}
                                required
                            />

                            <label htmlFor='nome' className='form-label mt-2'>Nome</label>
                            <input
                                type="text"
                                className='form-control'
                                name='nome'
                                placeholder='Digite o Nome do vendedor'
                                value={nome}
                                onChange={(e) => onInputChange(e)}
                                required
                            />

                            <label htmlFor='telefone' className='form-label mt-2'>Telefone</label>
                            <input
                                type="text"
                                className='form-control'
                                name='telefone'
                                placeholder='Digite o telefone do vendedor'
                                value={telefone}
                                onChange={(e) => onInputChange(e)}
                                required
                            />

                            <label htmlFor='numVenda' className='form-label mt-2'>Número de Vendas</label>
                            <input
                                type="text"
                                className='form-control'
                                name='numVenda'
                                placeholder='Digite o número de vendas desse vendedor'
                                value={numVenda}
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

                        <Link to="/vendedor" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
