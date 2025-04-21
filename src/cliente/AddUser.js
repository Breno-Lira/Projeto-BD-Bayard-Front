import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Adduser() {

    let navigate = useNavigate()

    const [user, setUser] = useState({
        cpf: "",
        nome: "",
        interesse: "",
        dataNascimento: "",
        cidade: "",
        bairro: "",
        rua: "",
        numero: "",
        cep: "",
        complemento: ""
    })

    const {
        cpf,
        nome,
        interesse,
        dataNascimento,
        cidade,
        bairro,
        rua,
        numero,
        cep,
        complemento
    } = user

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });

    };

    const onSubmit =async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/clientes/add", user)
        navigate("/cliente")
    }

    return (
        <div className='container'>

            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
                    <h2 className="text-center m-4">Register User</h2>

                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Cpf' className='form-label'>
                                Cpf
                            </label>
                            <input
                                type={"text"}
                                className='form-control'
                                name='cpf'
                                placeholder='Digite um nome'
                                value={cpf.toString()}
                                onChange={(e) => onInputChange(e)}
                                required
                            />
                            <label htmlFor='Nome' className='form-label'>
                                Nome
                            </label>
                            <input type={"text"} className='form-control' name='nome' placeholder='Digite um nome' value={nome.toString()} onChange={(e) => onInputChange(e)}></input>
                            <label htmlFor='Interesse' className='form-label'>
                                Interesse
                            </label>
                            <input type={"text"} className='form-control' name='interesse' placeholder='Digite um nome' value={interesse.toString()} onChange={(e) => onInputChange(e)}></input>
                            <label htmlFor='DataNascimento' className='form-label'>
                                Data de Nascimento
                            </label>
                            <input
                                type="date"
                                className='form-control'
                                name='dataNascimento'
                                value={dataNascimento}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='Cidade' className='form-label'>
                                Cidade
                            </label>
                            <input type={"text"} className='form-control' name='cidade' placeholder='Digite um nome' value={cidade.toString()} onChange={(e) => onInputChange(e)}></input>
                            <label htmlFor='Bairro' className='form-label'>
                                Bairro
                            </label>
                            <input type={"text"} className='form-control' name='bairro' placeholder='Digite um nome' value={bairro.toString()} onChange={(e) => onInputChange(e)}></input>
                            <label htmlFor='Rua' className='form-label'>
                                Rua
                            </label>
                            <input type={"text"} className='form-control' name='rua' placeholder='Digite um nome' value={rua.toString()} onChange={(e) => onInputChange(e)}></input>
                            <label htmlFor='Numero' className='form-label'>
                                Numero
                            </label>
                            <input type={"text"} className='form-control' name='numero' placeholder='Digite um nome' value={numero} onChange={(e) => onInputChange(e)}></input>
                            <label htmlFor='Cep' className='form-label'>
                                Cep
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="cep"
                                placeholder="Digite o CEP"
                                maxLength={8}
                                value={cep.toString()}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='Complemento' className='form-label'>
                                Complemento
                            </label>
                            <input type={"text"} className='form-control' name='complemento' placeholder='Digite um nome' value={complemento.toString()} onChange={(e) => onInputChange(e)}></input>
                        </div>

                        <Link type='submit' className='btn btn-outline-danger mx-4' to="/cliente">Cancelar</Link>
                        <button type='submit' className='btn btn-outline-success'>Adicionar</button>
                    </form>
                </div>
            </div>
        </div>

    )
}
