// Venda.js
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Venda() {

    const [vendas, setVendas] = useState([])
    const [cpfCliente, setCpfCliente] = useState("")
    const [cpfVendedor, setCpfVendedor] = useState("")

    useEffect(() => {
        buscarVendasFiltradas()
    }, [cpfCliente, cpfVendedor])

    const buscarVendasFiltradas = async () => {
        try {
            const params = new URLSearchParams()
            if (cpfCliente.trim() !== "") params.append("cpfCliente", cpfCliente)
            if (cpfVendedor.trim() !== "") params.append("cpfVendedor", cpfVendedor)

            const result = await axios.get(`http://localhost:8080/vendas/buscar?${params.toString()}`)
            setVendas(result.data)
        } catch (error) {
            console.error("Erro ao buscar vendas filtradas:", error)
        }
    }

    const deleteVenda = async (idVenda) => {
        await axios.delete(`http://localhost:8080/vendas/delete/${idVenda}`)
        buscarVendasFiltradas()
    }

    return (
        <div className='container mt-4'>
            <h2 className='text-center mb-4'>Lista de Vendas</h2>

            <div className="mb-4 d-flex justify-content-center gap-2">
                <Link className='btn btn-success' to="/addvenda">Adicionar</Link>
                <Link className="btn btn-success" to="/vendasItens">Itens Venda</Link>
            </div>


            {/* Campos de busca */}
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
            </div>

            {/* Tabela de vendas */}
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Subtotal</th>
                        <th>CPF Vendedor</th>
                        <th>CPF Cliente</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {vendas.length > 0 ? (
                        vendas.map((venda, index) => (
                            <tr key={index}>
                                <td>{venda.idVenda}</td>
                                <td>{venda.dataVenda}</td>
                                <td>{venda.valorSubtotal}</td>
                                <td>{venda.fkVendedorCPF}</td>
                                <td>{venda.fkClienteCPF}</td>
                                <td>
                                    <button onClick={() => deleteVenda(venda.idVenda)} className='btn btn-danger btn-sm'>Excluir</button>
                                </td>
                            </tr>
                        ))) : (
                        <tr>
                            <td colSpan="6" className="text-center">Nenhuma venda encontrada</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
