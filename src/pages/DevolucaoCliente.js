import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function DevolucaoCliente() {
    const [devclient, setDevCliente] = useState([])

    useEffect(() => {
        loadDevCliente();
    }, [])

    const loadDevCliente = async () => {
        const result = await axios.get("http://localhost:8080/devolucaoClientes")
        setDevCliente(result.data)
    }

    const deleteDevCliente = async (idDevolucao) => {
        await axios.delete(`http://localhost:8080/devolucaoClientes/delete/${idDevolucao}`)
        loadDevCliente()
    }


    // States
    const [cpfCliente, setCpfCliente] = useState("");
    const [cpfVendedor, setCpfVendedor] = useState("");
    const [produtoCodigo, setProdutoCodigo] = useState("");

    useEffect(() => {
        buscarDevolucoesFiltradas();
    }, [cpfCliente, cpfVendedor, produtoCodigo]);

    const buscarDevolucoesFiltradas = async () => {
        try {
            const params = new URLSearchParams();
            if (cpfCliente.trim() !== "") params.append("cpfCliente", cpfCliente);
            if (cpfVendedor.trim() !== "") params.append("cpfVendedor", cpfVendedor);
            if (produtoCodigo.trim() !== "") params.append("produtoCodigo", produtoCodigo);

            const result = await axios.get(`http://localhost:8080/devolucoes/buscar?${params.toString()}`);
            setDevCliente(result.data);
        } catch (error) {
            console.error("Erro ao buscar devoluções filtradas:", error);
        }
    };


    return (
        <div className='conteiner'>

            <h1 className='text-center mt-4'>Devolução de Clientes</h1>

            <Link className="btn btn-success" to="/adddevolucaoCliente">Adicionar</Link>


            <div className="row mb-4">
                <div className="col">
                    <label htmlFor="cpfVendedor" className="form-label">Buscar por CPF do Vendedor</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cpfVendedor"
                        placeholder="Digite o CPF do vendedor"
                        value={cpfVendedor}
                        onChange={(e) => setCpfVendedor(e.target.value)}
                    />
                </div>

                <div className="col">
                    <label htmlFor="cpfCliente" className="form-label">Buscar por CPF do Cliente</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cpfCliente"
                        placeholder="Digite o CPF do cliente"
                        value={cpfCliente}
                        onChange={(e) => setCpfCliente(e.target.value)}
                    />
                </div>

                <div className="col">
                    <label htmlFor="produtoCodigo" className="form-label">Buscar por Código do Produto</label>
                    <input
                        type="text"
                        className="form-control"
                        id="produtoCodigo"
                        placeholder="Digite o código do produto"
                        value={produtoCodigo}
                        onChange={(e) => setProdutoCodigo(e.target.value)}
                    />
                </div>
            </div>

            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Id da Devolução</th>
                            <th scope="col">Código Produto</th>
                            <th scope="col">CPF Cliente</th>
                            <th scope="col">CPF Vendedor</th>
                            <th scope="col">Data Devolução</th>
                            <th scope="col">Quantidade Produto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devclient.length > 0 ? (
                            devclient.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.idDevolucao}</td>
                                    <td>{item.fkProdutoCodigo}</td>
                                    <td>{item.fkClienteCPF}</td>
                                    <td>{item.fkVendedorCPF}</td>
                                    <td>{item.dataDevolucao}</td>
                                    <td>{item.qtdProduto}</td>
                                    <td>
                                        <button className='btn btn-danger mx-2' onClick={() => deleteDevCliente(item.idDevolucao)}>Delete</button>
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