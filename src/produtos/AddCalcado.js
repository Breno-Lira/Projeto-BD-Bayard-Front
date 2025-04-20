import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AddCalcado() {

    const navigate = useNavigate()

    const [calcado, setCalcado] = useState({
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

        if (['codigo', 'nome', 'cor', 'preco'].includes(name)) {
            setCalcado(prev => ({
                ...prev,
                produto: {
                    ...prev.produto,
                    [name]: value
                }
            }))
        } else {
            setCalcado({ ...calcado, [name]: value })
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:8080/calcados/add", calcado)
        navigate("/calcado")
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Adicionar Calçado</h2>

                    <form onSubmit={onSubmit}>
                        <div className='mb-3'>
                            <label>Código</label>
                            <input type="text" className='form-control' name='codigo' onChange={onInputChange} required />

                            <label>Nome</label>
                            <input type="text" className='form-control' name='nome' onChange={onInputChange} required />

                            <label>Cor</label>
                            <input type="text" className='form-control' name='cor' onChange={onInputChange} />

                            <label>Preço</label>
                            <input type="number" step="0.01" className='form-control' name='preco' onChange={onInputChange} required />

                            <div className='container m-3'>
                                <div className='d-flex align-items-center'>
                                    <label className='form-label me-2 mb-0' style={{ minWidth: '20px' }}>Gênero:</label>
                                    <select
                                        className="form-select w-25"
                                        name='genero'
                                        value={calcado.genero}
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
                                        value={calcado.tamanho}
                                        onChange={onInputChange}
                                    >
                                        <option value="" disabled hidden>Selecione</option>
                                        <option value="34">34</option>
                                        <option value="35">35</option>
                                        <option value="36">36</option>
                                        <option value="37">37</option>
                                        <option value="38">38</option>
                                        <option value="39">39</option>
                                        <option value="40">40</option>
                                        <option value="41">41</option>
                                        <option value="42">42</option>
                                        <option value="43">43</option>
                                        <option value="44">44</option>
                                    </select>
                                </div>

                            </div>

                            <div className='container m-3'>
                                <div className='d-flex align-items-center'>
                                    <label className='form-label me-2 mb-0' style={{ minWidth: '20px' }}>FaixaEtaria:</label>
                                    <select
                                        className="form-select w-25"
                                        name='faixaEtaria'
                                        value={calcado.faixaEtaria}
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

                        <Link to="/calcado" className='btn btn-outline-danger mx-2'>Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
