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

    const [cpfCaixa, setCpfCaixa] = useState("");
    const [idVenda, setIdVenda] = useState("");

    useEffect(() => {
        buscarPagamentosFiltrados();
    }, [cpfCaixa, idVenda]);

    const buscarPagamentosFiltrados = async () => {
        try {
            const params = new URLSearchParams();
            if (cpfCaixa.trim() !== "") params.append("cpfCaixa", cpfCaixa);
            if (idVenda.trim() !== "") params.append("idVenda", idVenda);

            const result = await axios.get(`http://localhost:8080/pagamento/buscar?${params.toString()}`);
            setPagamentos(result.data); // setPagamentos deve ser o state da lista de pagamentos
        } catch (error) {
            console.error("Erro ao buscar pagamentos filtrados:", error);
        }
    };


    return (
        <div className='container mt-4'>
            <h2 className='text-center mb-4'>Lista de Pagamentos</h2>
            <div className="mb-4">
                <Link className='btn btn-success' to="/addpagamentos">Adicionar</Link>

                <div className="row mb-4">
                    <div className="col">
                        <label htmlFor="cpfCaixa" className="form-label">Buscar por CPF do Caixa</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cpfCaixa"
                            placeholder="Digite o CPF do caixa"
                            value={cpfCaixa}
                            onChange={(e) => setCpfCaixa(e.target.value)}
                        />
                    </div>

                    <div className="col">
                        <label htmlFor="idVenda" className="form-label">Buscar por ID da Venda</label>
                        <input
                            type="text"
                            className="form-control"
                            id="idVenda"
                            placeholder="Digite o ID da venda"
                            value={idVenda}
                            onChange={(e) => setIdVenda(e.target.value)}
                        />
                    </div>
                </div>

            </div>
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
                    {pagamentos.length > 0 ? (
                        pagamentos.map((pagamento, index) => (
                            <tr key={index}>
                                <td>{pagamento.idPagamento}</td>
                                <td>{pagamento.forma_pag}</td>
                                <td>{pagamento.nota_fiscal}</td>
                                <td>{pagamento.caixa_cpf}</td>
                                <td>{pagamento.idVenda}</td>
                                <td>R$ {pagamento.valorTotal}</td>
                                <td>R$ {pagamento.desconto}</td>
                                <td>
                                    <Link
                                        className='btn btn-outline-primary mx-2'
                                        to={`/editpagamentos/${pagamento.idPagamento}`}
                                    >
                                        Editar
                                    </Link>

                                    <button
                                        onClick={() => deletePagamento(pagamento.idPagamento)}
                                        className='btn btn-danger btn-sm'
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">Nenhum pagamento encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
