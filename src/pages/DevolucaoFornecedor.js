import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function DevolucaoFornecedor() {
    const [devfor, setDevFornecedor] = useState([])

    useEffect(() => {
        loadDevFornecedor();
    }, [])

    const loadDevFornecedor = async () => {
        const result = await axios.get("http://localhost:8080/devolucaoFornecedores")
        setDevFornecedor(result.data)
    }

    const deleteDevFornecedor = async (idDevolucao) => {
        await axios.delete(`http://localhost:8080/devolucaoFornecedores/delete/${idDevolucao}`)
        loadDevFornecedor()
    }

    const [estoquistaCpf, setEstoquistaCpf] = useState("");
    const [fornecedorCnpj, setFornecedorCnpj] = useState("");
    const [codigoProduto, setCodigoProduto] = useState("");

    useEffect(() => {
        buscarDevolucoesFornecedorFiltradas();
    }, [estoquistaCpf, fornecedorCnpj, codigoProduto]);

    const buscarDevolucoesFornecedorFiltradas = async () => {
        try {
            const params = new URLSearchParams();
            if (estoquistaCpf.trim() !== "") params.append("estoquistaCpf", estoquistaCpf);
            if (fornecedorCnpj.trim() !== "") params.append("fornecedorCnpj", fornecedorCnpj);
            if (codigoProduto.trim() !== "") params.append("codigoProduto", codigoProduto);

            const result = await axios.get(`http://localhost:8080/devolucaoFornecedores/buscar?${params.toString()}`);
            setDevFornecedor(result.data); // setDevFornecedor deve ser seu state de lista
        } catch (error) {
            console.error("Erro ao buscar devoluções para fornecedor filtradas:", error);
        }
    };


    return (
        <div className='conteiner'>

            <h1 className='text-center mt-4'>Devolução dos Fornecedores</h1>

            <Link className="btn btn-success" to="/addDevolucaoFornecedor">Adicionar</Link>


            <div className="row mb-4">
                <div className="col">
                    <label htmlFor="estoquistaCpf" className="form-label">Buscar por CPF do Estoquista</label>
                    <input
                        type="text"
                        className="form-control"
                        id="estoquistaCpf"
                        placeholder="Digite o CPF do estoquista"
                        value={estoquistaCpf}
                        onChange={(e) => setEstoquistaCpf(e.target.value)}
                    />
                </div>

                <div className="col">
                    <label htmlFor="fornecedorCnpj" className="form-label">Buscar por CNPJ do Fornecedor</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fornecedorCnpj"
                        placeholder="Digite o CNPJ do fornecedor"
                        value={fornecedorCnpj}
                        onChange={(e) => setFornecedorCnpj(e.target.value)}
                    />
                </div>

                <div className="col">
                    <label htmlFor="codigoProduto" className="form-label">Buscar por Código do Produto</label>
                    <input
                        type="text"
                        className="form-control"
                        id="codigoProduto"
                        placeholder="Digite o código do produto"
                        value={codigoProduto}
                        onChange={(e) => setCodigoProduto(e.target.value)}
                    />
                </div>
            </div>


            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Id da Devolução Fornecedor</th>
                            <th scope="col">CPF do Estoquista</th>
                            <th scope="col">CNPJ do Fornecedor</th>
                            <th scope="col">Código do Produto</th>
                            <th scope="col">Data da Devolução</th>
                            <th scope="col">Quantidade de Produtos</th>
                            <th scope="col">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devfor.length > 0 ? (
                            devfor.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.idDevFornecedor}</td>
                                    <td>{item.estoquistaCpf}</td>
                                    <td>{item.fornecedorCnpj}</td>
                                    <td>{item.codigoProduto}</td>
                                    <td>{item.devData}</td>
                                    <td>{item.qtdProduto}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => deleteDevFornecedor(item.idDevFornecedor)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">Nenhuma devolução encontrada</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}