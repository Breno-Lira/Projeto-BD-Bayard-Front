import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function VendaItem(){
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

    const [search, setSearch] = useState("");

    const handleSearchChange = async (e) => {
        const idVenda = e.target.value;
        setSearch(idVenda);

        if (idVenda.trim() === "") {
            loadVendaItem(); // volta lista completa
        } else {
            try {
                const res = await axios.get(`http://localhost:8080/buscar-por-venda/${idVenda}`);
                if (res.status === 204) {
                    setVendaItem([]); // limpa lista se não encontrou ninguém
                } else {
                    setVendaItem(res.data);
                }
            } catch (error) {
                console.error("Erro na busca:", error);
            }
        }
    };


    return (
        <div className='conteiner'>

            <h1 className='text-center mt-4'>Itens Vendas</h1>

            <Link className="btn btn-success mb-2 me-2" to="/venda">Voltar</Link>
            <Link className="btn btn-success mb-2" to="/addvendasitens">Adicionar</Link>

            <div className="px-3">
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Buscar por Id da Venda"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

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
                        {VendaItem.length > 0 ? (
                            VendaItem.map((item, index) => (
                            <tr key={index}>
                                <td>{item.idVendaItem}</td>
                                <td>{item.qtdVendaItem}</td>
                                <td>{item.codigo_produto}</td>
                                <td>{item.idVenda}</td>
                                <td>
                                    <button onClick={() => deleteVendaItem(item.idVendaItem)} className='btn btn-danger btn-sm'>Excluir</button>
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

        </div>
    )
}