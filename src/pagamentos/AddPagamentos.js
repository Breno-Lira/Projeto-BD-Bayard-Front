import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddPagamentos() {

    const navigate = useNavigate()

    const [pagamentos, setPagamentos] = useState({
        forma_pag: "",
        nota_fiscal: "",
        caixa_cpf: "",
        idVenda: "",
        valorTotal: "",
        desconto: ""
    })

    const { forma_pag, nota_fiscal, caixa_cpf, idVenda, valorTotal, desconto } = pagamentos

    const onInputChange = (e) => {
        setPagamentos({ ...pagamentos, [e.target.name]: e.target.value })
    }

    const onCheckboxChange = (e) => {
        setPagamentos({ ...pagamentos, [e.target.name]: e.target.checked })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
      
        const pagamentosPayload = {
            forma_pag: (pagamentos.forma_pag),
            nota_fiscal: (pagamentos.nota_fiscal),
            caixa_cpf: (pagamentos.caixa_cpf),
            idVenda: (pagamentos.idVenda),
            valorTotal: (pagamentos.valorTotal),
            desconto: (pagamentos.desconto),
        };
      
        await axios.post("http://localhost:8080/pagamento/add", pagamentosPayload);
        navigate("/pagamentos");
      };
    
    const [caixa, setCaixa] = useState([]);
    const [venda, setVenda] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/caixa")
            .then(res => setCaixa(res.data));

        axios.get("http://localhost:8080/vendas")
            .then(res => setVenda(res.data));
    }, []);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Adicionar Pagamento</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
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

                            <label className='form-label'>Cpf do caixa</label>
                            <select
                                className='form-select'
                                name='caixa_cpf'
                                value={pagamentos.caixa_cpf}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                {caixa.map(c => (
                                    <option key={c.funcionario.cpf} value={c.funcionario.cpf}>{c.funcionario.nome} - {c.funcionario.cpf}</option>
                                ))}
                            </select>

                            <label className='form-label'>Id da Venda</label>
                            <select
                                className='form-select'
                                name='idVenda'
                                value={pagamentos.idVenda}
                                onChange={onInputChange}
                                required
                            >
                                <option value="" disabled hidden>Selecione</option>
                                {venda.map(v => (
                                    <option key={v.idVenda} value={v.idVenda}>Venda: {v.idVenda}</option>
                                ))}
                            </select>
                            {/*
                             <label htmlFor='valorTotal' className='form-label mt-2'>Valor total</label>
                            <input
                                type="text"
                                className='form-control'
                                name='valorTotal'
                                placeholder='Digite o valor total do pagamento'
                                value={valorTotal}
                                onChange={(e) => onInputChange(e)}
                                required
                            /> */}

                            <label htmlFor='desconto' className='form-label mt-2'>Desconto</label>
                            <input
                                type="text"
                                className='form-control'
                                name='desconto'
                                placeholder='Digite o desconto'
                                value={desconto}
                                onChange={(e) => onInputChange(e)}
                                required
                            />


                        </div>

                        <Link to="/pagamentos" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
