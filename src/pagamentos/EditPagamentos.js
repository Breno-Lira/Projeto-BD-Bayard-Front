import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function EditPagamentos() {

    const navigate = useNavigate()
    const { idPagamento: idPagamentoParam } = useParams()

    const [pagamentos, setPagamentos] = useState({
            idPagamento: "",
            forma_pag: "",
            nota_fiscal: "",
            caixa_cpf: "",
            idVenda: "",
            valorTotal: "",
            desconto: ""
        })

    const { idPagamento, forma_pag, nota_fiscal, caixa_cpf, idVenda, valorTotal, desconto } = pagamentos

    useEffect(() => {
        loadPagamentos()
    }, [])

    const loadPagamentos = async () => {
        const result = await axios.get(`http://localhost:8080/pagamento/${idPagamentoParam}`)
        setPagamentos(result.data)
    }

    const onInputChange = (e) => {
        setPagamentos({ ...pagamentos, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:8080/pagamento/editar/${idPagamentoParam}`, pagamentos)
        navigate("/pagamentos")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Editar Pagamento</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='idPagamento' className='form-label'>ID do Pagamento</label>
                            <input
                                type="text"
                                className='form-control'
                                name='idPagamento'
                                value={idPagamento}
                                disabled
                            />

                            <label htmlFor='forma_pag' className='form-label'>Forma de Pagamento</label>
                            <input
                                type="text"
                                className='form-control'
                                name='forma_pag'
                                placeholder='Digite a forma do pagamento'
                                value={forma_pag}
                                onChange={(e) => onInputChange(e)}
                                required
                            />

                            <label htmlFor='nota_fiscal' className='form-label mt-2'>Nota Fiscal</label>
                            <input
                                type="text"
                                className='form-control'
                                name='nota_fiscal'
                                placeholder='Digite o número da nota fiscal'
                                value={nota_fiscal}
                                onChange={(e) => onInputChange(e)}
                                required
                            />

                            <label htmlFor='caixa_cpf' className='form-label mt-2'>CPF do caixa</label>
                            <input
                                type="text"
                                className='form-control'
                                name='caixa_cpf'
                                placeholder='Digite o cpf do caixa'
                                value={caixa_cpf}
                                onChange={(e) => onInputChange(e)}
                                required
                            />

                            <label htmlFor='idVenda' className='form-label mt-2'>ID da venda</label>
                            <input
                                type="text"
                                className='form-control'
                                name='idVenda'
                                placeholder='Digite o ID da venda'
                                value={idVenda}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                             <label htmlFor='valorTotal' className='form-label mt-2'>Valor total</label>
                            <input
                                type="number"
                                step="0.01"
                                className='form-control'
                                name='valorTotal'
                                placeholder='Digite o valor total do pagamento'
                                value={valorTotal}
                                onChange={(e) => onInputChange(e)}
                                required
                            />

                            <label htmlFor='desconto' className='form-label mt-2'>Desconto</label>
                            <input
                                type="number"
                                step="0.01"
                                className='form-control'
                                name='desconto'
                                placeholder='Digite o desconto'
                                value={desconto}
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
