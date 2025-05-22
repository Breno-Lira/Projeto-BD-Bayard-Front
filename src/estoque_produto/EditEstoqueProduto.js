import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import EstoqueProduto from '../pages/EstoqueProduto'

export default function EditEstoqueProduto() {

    const navigate = useNavigate()
    const { id_estoque: id_estoqueParam } = useParams()

    const [estoqueProduto, setEstoqueProduto] = useState({
            id_estoque: "",
            codigo_produto: "",
            quantidade_produtos: ""
        })

    const { id_estoque, codigo_produto, quantidade_produtos } = estoqueProduto

    useEffect(() => {
        loadEstoqueProduto()
    }, [])

    const loadEstoqueProduto = async () => {
        const result = await axios.get(`http://localhost:8080/estoque_produto/${id_estoqueParam}`)
        setEstoqueProduto(result.data)
    }

    const onInputChange = (e) => {
        setEstoqueProduto({ ...estoqueProduto, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8080/estoque_produto/editar/${id_estoqueParam}`, estoqueProduto)
        navigate("/estoqueProduto")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Editar Pagamento</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='id_estoque' className='form-label'>ID do Estoque Produto</label>
                            <input
                                type="text"
                                className='form-control'
                                name='id_estoque'
                                value={id_estoque}
                                disabled
                            />

                            <label htmlFor='codigo_produto' className='form-label'>Código do Produto</label>
                            <input
                                type="text"
                                className='form-control'
                                name='codigo_produto'
                                value={codigo_produto}
                                disabled
                            />

                            <label htmlFor='quantidade_produtos' className='form-label mt-2'>Quantidade de Produtos</label>
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

                        <Link to="/pagamentos" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
