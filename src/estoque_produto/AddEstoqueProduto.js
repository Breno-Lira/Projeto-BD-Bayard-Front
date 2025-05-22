import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function addEstoqueProduto() {

    const navigate = useNavigate()

    const [estoqueProduto, setEstoqueProduto] = useState({
        id_estoque: "",
        codigo_produto: "",
        quantidade_produtos: ""
    })

    const { id_estoque, codigo_produto, quantidade_produtos } = estoqueProduto

    const onInputChange = (e) => {
        setEstoqueProduto({ ...estoqueProduto, [e.target.name]: e.target.value })
    }

    const onCheckboxChange = (e) => {
        setEstoqueProduto({ ...estoqueProduto, [e.target.name]: e.target.checked })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
      
        const estoqueProdutoPayload = {
            id_estoque: (estoqueProduto.id_estoque),
            codigo_produto: (estoqueProduto.codigo_produto),
            quantidade_produtos: (estoqueProduto.quantidade_produtos)
        };
      
        await axios.post("http://localhost:8080/estoque_produto/add", estoqueProdutoPayload);
        navigate("/estoqueProduto");
      };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Adicionar Estoque do produto</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>

                            <label htmlFor='nota_fiscal' className='form-label mt-2'>Código do produto</label>
                            <input
                                type="text"
                                className='form-control'
                                name='codigo_produto'
                                placeholder='Digite o ID do produto'
                                value={codigo_produto}
                                onChange={(e) => onInputChange(e)}
                                required
                            />

                            <label htmlFor='quantidade_produtos' className='form-label mt-2'>Quantidade de produtos</label>
                            <input
                                type="text"
                                className='form-control'
                                name='quantidade_produtos'
                                placeholder='Digite a quantidade de produtos'
                                value={quantidade_produtos}
                                onChange={(e) => onInputChange(e)}
                                required
                            />

                        </div>

                        <Link to="/estoqueProduto" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
