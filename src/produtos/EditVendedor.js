import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditVendedor() {

    const navigate = useNavigate();
    const { cpf } = useParams();

    const [vendedor, setVendedor] = useState({
        funcionario: {
            cpf: "",
            telefone: "",
            nome: "",
            vendedorResponsavel: false,
            chefia: false
        },
        numVenda: ""
    });

    const { telefone, nome, vendedorResponsavel, chefia } = vendedor.funcionario;
    const { numVenda } = vendedor;

    useEffect(() => {
        loadVendedor();
    }, []);

    const loadVendedor = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/vendedor/${cpf}`);
            console.log(result.data);
            setVendedor(result.data);
        } catch (error) {
            console.error("Erro ao carregar vendedor:", error);
        }
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'numVenda') {
            setVendedor(prevState => ({
                ...prevState,
                numVenda: value
            }));
        } else {
            setVendedor(prevState => ({
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
        setVendedor(prevState => ({
            ...prevState,
            funcionario: {
                ...prevState.funcionario,
                [name]: checked
            }
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const vendedorPayload = {
            funcionario: {
                cpf: vendedor.funcionario.cpf,
                telefone: vendedor.funcionario.telefone,
                nome: vendedor.funcionario.nome,
                vendedorResponsavel: vendedor.funcionario.vendedorResponsavel,
                chefia: vendedor.funcionario.chefia
            },
            numVenda: parseInt(vendedor.numVenda)
        };

        try {
            await axios.put(`http://localhost:8080/vendedor/editar/${cpf}`, vendedorPayload);
            navigate("/vendedor");
        } catch (error) {
            console.error("Erro ao atualizar vendedor:", error);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Editar Vendedor</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='cpf' className='form-label'>Cpf</label>
                            <input
                                type="text"
                                className='form-control'
                                name='cpf'
                                placeholder='Digite o Cpf do vendedor'
                                value={vendedor.funcionario.cpf}
                                onChange={(e) => onInputChange(e)}
                                disabled
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
                                placeholder='Digite o número de vendas do vendedor'
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

                        <Link to="/vendedor" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}