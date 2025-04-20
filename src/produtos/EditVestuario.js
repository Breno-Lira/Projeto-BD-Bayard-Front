import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function EditVestuario() {

    const navigate = useNavigate()
    const { codigo: codigoParam } = useParams()

    const [vestuario, setVestuario] = useState({
        genero: "",
        tamanho: "",
        faixaEtaria: "",
        produto: {
            codigo: "",
            nome: "",
            cor: "",
            preco: ""
        }
    })

    const onInputChange = (e) => {
        const { name, value } = e.target

        // Atualiza campo do produto (nome, cor, preco) ou campo próprio (genero, tamanho...)
        if (["codigo", "nome", "cor", "preco"].includes(name)) {
            setVestuario(prev => ({
                ...prev,
                produto: {
                    ...prev.produto,
                    [name]: value
                }
            }))
        } else {
            setVestuario(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        // Validação simples
        const { genero, tamanho, faixaEtaria, produto } = vestuario
        if (!genero || !tamanho || !faixaEtaria || !produto.nome || !produto.preco) {
            alert("Por favor, preencha todos os campos obrigatórios.")
            return
        }

        await axios.put(`http://localhost:8080/vestuario/editar/${codigoParam}`, vestuario)
        navigate("/vestuario")
    }

    useEffect(() => {
        loadVestuario()
    }, [])

    const loadVestuario = async () => {
        const result = await axios.get(`http://localhost:8080/vestuario/${codigoParam}`)
        setVestuario(result.data)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 offset-md-2 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Editar Vestuário</h2>

                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <label className='form-label'>Código</label>
                            <input
                                type="text"
                                className='form-control'
                                name='codigo'
                                value={vestuario.produto.codigo}
                                disabled
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
                        </div>

                        {/* Seletor de Gênero */}
                        <div className='mb-3 d-flex align-items-center'>
                            <label className='form-label me-2 mb-0' style={{ minWidth: '70px' }}>Gênero:</label>
                            <select
                                className="form-select w-25"
                                name='genero'
                                value={vestuario.genero}
                                onChange={onInputChange}
                            >
                                <option value="" disabled hidden>Selecione</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                                <option value="U">Unissex</option>
                            </select>
                        </div>

                        {/* Seletor de Tamanho */}
                        <div className='mb-3 d-flex align-items-center'>
                            <label className='form-label me-2 mb-0' style={{ minWidth: '70px' }}>Tamanho:</label>
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

                        {/* Seletor de Faixa Etária */}
                        <div className='mb-3 d-flex align-items-center'>
                            <label className='form-label me-2 mb-0' style={{ minWidth: '90px' }}>Faixa Etária:</label>
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

                        <Link to="/vestuario" className='btn btn-outline-danger mx-4'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
