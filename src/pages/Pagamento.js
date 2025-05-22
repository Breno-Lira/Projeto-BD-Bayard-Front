// Pagamento.js
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Pagamento() {

    const [pagamentos, setPagamentos] = useState([])

    useEffect(() => {
        loadPagamentos()
    }, [])

    const loadPagamentos = async () => {
        const result = await axios.get("http://localhost:8080/pagamentos")
        setPagamentos(result.data)
    }

    const deletePagamento = async (idPagamento) => {
        await axios.delete(`http://localhost:8080/pagamento/delete/${idPagamento}`)
        loadPagamentos()
    }

    return (
        <div className='container mt-4'>
            <h2 className='text-center mb-4'>Lista de Pagamentos</h2>
            <Link className='btn btn-success' to="/addpagamentos">Adicionar</Link>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Forma pagamento</th>
                        <th>Nota fiscal</th>
                        <th>CPF Caixa</th>
                        <th>ID Venda</th>
                        <th>Valor total</th>
                        <th>Desconto</th>
                    </tr>
                </thead>
                <tbody>
                    {pagamentos.map((pagamento, index) => (
                        <tr key={index}>
                            <td>{pagamento.idPagamento}</td>
                            <td>{pagamento.forma_pag}</td>
                            <td>{pagamento.nota_fiscal}</td>
                            <td>{pagamento.caixa_cpf}</td>
                            <td>{pagamento.idVenda}</td>
                            <td>{pagamento.valorTotal}</td>
                            <td>{pagamento.desconto}</td>
                            <td>    
                                <Link
                                    className='btn btn-outline-primary mx-2'
                                    to={`/editpagamentos/${pagamento.idPagamento}`}
                                >
                                    Editar
                                </Link>

                                
                                <button onClick={() => deletePagamento(pagamento.idPagamento)} className='btn btn-danger btn-sm'>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
