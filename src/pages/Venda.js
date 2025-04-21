// Venda.js
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Venda() {

    const [vendas, setVendas] = useState([])

    useEffect(() => {
        loadVendas()
    }, [])

    const loadVendas = async () => {
        const result = await axios.get("http://localhost:8080/vendas")
        setVendas(result.data)
    }

    const deleteVenda = async (idVenda) => {
        await axios.delete(`http://localhost:8080/vendas/delete/${idVenda}`)
        loadVendas()
    }

    return (
        <div className='container mt-4'>
            <h2 className='text-center mb-4'>Lista de Vendas</h2>
            <Link className='btn btn-primary mb-3' to="/addvenda">Nova Venda</Link>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Subtotal</th>
                        <th>CPF Vendedor</th>
                        <th>CPF Cliente</th>
                        <th>Código Produto</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {vendas.map((venda, index) => (
                        <tr key={index}>
                            <td>{venda.idVenda}</td>
                            <td>{venda.dataVenda}</td>
                            <td>{venda.valorSubtotal}</td>
                            <td>{venda.fkVendedorCPF}</td>
                            <td>{venda.fkClienteCPF}</td>
                            <td>{venda.fkProdutoCodigo}</td>
                            <td>
                                
                                <button onClick={() => deleteVenda(venda.idVenda)} className='btn btn-danger btn-sm'>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
