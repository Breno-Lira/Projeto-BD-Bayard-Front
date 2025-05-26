import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function Requisita() {

    const [requisita, setRequisita] = useState([])

    const {codigoReq} = useParams()

    useEffect(() => {
        loadRequisita()
    }, [])

    const loadRequisita = async () => {
        const result = await axios.get("http://localhost:8080/requisita")
        setRequisita(result.data)
    }

    const deleteRequisita = async (codigoReq) => {
        await axios.delete(`http://localhost:8080/requisita/delete/${codigoReq}`)
        loadRequisita()
    }

    const [estoquistaCpf, setEstoquistaCpf] = useState("");
    const [codigoProduto, setCodigoProduto] = useState("");
    const [fornecedorCnpj, setFornecedorCnpj] = useState("");

    useEffect(() => {
        buscarRequisicoesFiltradas();
    }, [estoquistaCpf, codigoProduto, fornecedorCnpj]);

    const buscarRequisicoesFiltradas = async () => {
        try {
            const params = new URLSearchParams();
            if (estoquistaCpf.trim() !== "") params.append("estoquistaCpf", estoquistaCpf);
            if (codigoProduto.trim() !== "") params.append("codigoProduto", codigoProduto);
            if (fornecedorCnpj.trim() !== "") params.append("fornecedorCnpj", fornecedorCnpj);

            const result = await axios.get(`http://localhost:8080/requisita/buscar?${params.toString()}`);
            setRequisita(result.data);
        } catch (error) {
            console.error("Erro ao buscar requisições:", error);
        }
    };


    return (
        <div className='container'>

            <h1 className='text-center mt-4'>Requisições</h1>

            <Link className="btn btn-success" to="/addrequisita">Adicionar</Link>

            {/* Filtros */}
            <div className="row mb-3">
                <div className="col-md-4">
                    <label>CPF do Estoquista:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={estoquistaCpf}
                        onChange={(e) => setEstoquistaCpf(e.target.value)}
                        placeholder="Digite o CPF do estoquista"
                    />
                </div>
                <div className="col-md-4">
                    <label>Código do Produto:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={codigoProduto}
                        onChange={(e) => setCodigoProduto(e.target.value)}
                        placeholder="Digite o código do produto"
                    />
                </div>
                <div className="col-md-4">
                    <label>CNPJ do Fornecedor:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={fornecedorCnpj}
                        onChange={(e) => setFornecedorCnpj(e.target.value)}
                        placeholder="Digite o CNPJ do fornecedor"
                    />
                </div>
            </div>

            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Codigo da Requisição</th>
                            <th scope="col">Cpf do Estoquista</th>
                            <th scope="col">Codigo do Produto</th>
                            <th scope="col">Cnpj do Fornecedor</th>
                            <th scope="col">Quantidade de Produtos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requisita.length > 0 ? (
                            requisita.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.codigoReq}</td>
                                    <td>{item.estoquistaCpf}</td>
                                    <td>{item.codigoProduto}</td>
                                    <td>{item.fornecedorCnpj}</td>
                                    <td>{item.qtdProduto}</td>
                                    <td>
                                        <button
                                            className='btn btn-danger mx-2'
                                            onClick={() => deleteRequisita(item.codigoReq)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">Nenhuma requisição encontrada</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

