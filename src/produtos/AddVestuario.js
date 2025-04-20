import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddVestuario() {

    const navigate = useNavigate()

    const [vestuario, setVestuario] = useState({
        produto: {
            codigo: "",
            nome: "",
            cor: "",
            preco: ""
        },
        genero: "",
        tamanho: "",
        faixaEtaria: ""
    })

    const onInputChange = (e) => {
        const { name, value } = e.target

        // se o campo for do produto, atualiza dentro de produto
        if (["codigo", "nome", "cor", "preco"].includes(name)) {
            setVestuario({
                ...vestuario,
                produto: { ...vestuario.produto, [name]: value }
            })
        } else {
            setVestuario({
                ...vestuario,
                [name]: value
            })
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/vestuario/add", vestuario)
        navigate("/vestuario")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Cadastrar Vestuário</h2>

                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Código</label>
                            <input
                                type="text"
                                className='form-control'
                                name='codigo'
                                value={vestuario.produto.codigo}
                                onChange={onInputChange}
                                required
                            />

                            <label className='form-label'>Nome</label>
                            <input
                                type="text"
                                className='form-control'
                                name='nome'
                                value={vestuario.produto.nome}
                                onChange={onInputChange}
                                required
                            />

                            <label className='form-label'>Cor</label>
                            <input
                                type="text"
                                className='form-control'
                                name='cor'
                                value={vestuario.produto.cor}
                                onChange={onInputChange}
                            />

                            <label className='form-label'>Preço</label>
                            <input
                                type="number"
                                step="0.01"
                                className='form-control'
                                name='preco'
                                value={vestuario.produto.preco}
                                onChange={onInputChange}
                                required
                            />

                            <div className='container m-3'>
                                <div className='d-flex align-items-center'>
                                    <label className='form-label me-2 mb-0' style={{ minWidth: '20px' }}>Gênero:</label>
                                    <select
                                        className="form-select w-25"
                                        name='genero'
                                        value={vestuario.genero}
                                        onChange={onInputChange}
                                    >
                                        <option value="" disabled hidden>Selecione</option>
                                        <option value="M">Masculnio</option>
                                        <option value="F">Feminino</option>
                                        <option value="U">Unisex</option>
                                    </select>
                                </div>

                            </div>

                            <div className='container m-3'>
                                <div className='d-flex align-items-center'>
                                    <label className='form-label me-2 mb-0' style={{ minWidth: '20px' }}>Tamanho:</label>
                                    <select
                                        className="form-select w-25"
                                        name='tamanho'
                                        value={vestuario.tamanho}
                                        onChange={onInputChange}
                                    >
                                        <option value="" disabled hidden>Selecione</option>
                                        <option value="PP">PP</option>
                                        <option value="P">P</option>
                                        <option value="M">M</option>
                                        <option value="G">G</option>
                                        <option value="GG">GG</option>
                                        <option value="XG">XG</option>
                                    </select>
                                </div>

                            </div>

                            <div className='container m-3'>
                                <div className='d-flex align-items-center'>
                                    <label className='form-label me-2 mb-0' style={{ minWidth: '20px' }}>FaixaEtaria:</label>
                                    <select
                                        className="form-select w-25"
                                        name='faixaEtaria'
                                        value={vestuario.faixaEtaria}
                                        onChange={onInputChange}
                                    >
                                        <option value="" disabled hidden>Selecione</option>
                                        <option value="BB">Bebê</option>
                                        <option value="In">Infantil</option>
                                        <option value="Ju">Juvenil</option>
                                        <option value="Ad">Adulto</option>
                                        <option value="Ve">Idoso</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <Link to="/vestuario" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
