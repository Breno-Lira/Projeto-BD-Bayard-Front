import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddVenda() {

    const navigate = useNavigate()

    const [vendaItem, setVendaItem] = useState({
        qtdVendaItem: "",
        codigo_produto: "",
        idVenda: ""
    })

    const onInputChange = (e) => {
        const { name, value } = e.target
        setVendaItem({ ...vendaItem, [name]: value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            qtdVendaItem: vendaItem.qtdVendaItem,
            codigo_produto: vendaItem.codigo_produto,
            idVenda: vendaItem.idVenda
        };

        await axios.post("http://localhost:8080/vendaItem/add", payload);
        navigate("/vendasItens");
    };


    const [produtos, setProdutos] = useState([]);
    const [venda, setVenda] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/produtos2")
            .then(res => setProdutos(res.data));

        axios.get("http://localhost:8080/vendas")
            .then(res => setVenda(res.data));
    }, []);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Cadastrar Venda de Itens</h2>

                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Quantidade de Itens</label>
                            <input
                                type="number"
                                className='form-control'
                                name='qtdVendaItem'
                                value={vendaItem.qtdVendaItem}
                                onChange={onInputChange}
                                required
                            />

                            <label className='form-label'>Código do Produto</label>
                            <select
                                className='form-select'
                                name='codigo_produto'
                                value={vendaItem.codigo_produto}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                {produtos.map(p => (
                                    <option key={p.codigo} value={p.codigo}>{p.nome} - {p.codigo}</option>
                                ))}
                            </select>

                            <label className='form-label'>Id da Venda</label>
                            <select
                                className='form-select'
                                name='idVenda'
                                value={vendaItem.idVenda}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                {venda.map(v => (
                                    <option key={v.idVenda} value={v.idVenda}>Venda: {v.idVenda}</option>
                                ))}
                            </select>

                        </div>

                        <Link to="/vendasItens" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
