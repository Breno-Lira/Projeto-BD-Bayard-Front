import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Repoe(){
    const [VendaItem, setVendaItem] = useState([])

    useEffect(() => {
        loadVendaItem();
    }, [])

    const loadVendaItem = async () => {
        const result = await axios.get("http://localhost:8080/vendasItens")
        setVendaItem(result.data)
    }

    const deleteVendaItem = async (id) => {
        await axios.delete(`http://localhost:8080/vendaItem/delete/${id}`);
        loadVendaItem();
    }

    return (
        <div className='conteiner'>

            <h1 className='text-center mt-4'>Itens Vendas</h1>

            <Link className="btn btn-success mb-2 me-2" to="/venda">Voltar</Link>
            <Link className="btn btn-success mb-2" to="/addvendasitens">Adicionar</Link>

            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th>Id Venda Item</th>
                            <th>Quantidade de produtor</th>
                            <th>Codigo Produto</th>
                            <th>Id Venda</th>
                        </tr>
                    </thead>
                    <tbody>
                        {VendaItem.map((item, index) => (
                            <tr key={index}>
                                <td>{item.idVendaItem}</td>
                                <td>{item.qtdVendaItem}</td>
                                <td>{item.codigo_produto}</td>
                                <td>{item.idVenda}</td>
                                <td>
                                    <button onClick={() => deleteVendaItem(item.idVendaItem)} className='btn btn-danger btn-sm'>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}