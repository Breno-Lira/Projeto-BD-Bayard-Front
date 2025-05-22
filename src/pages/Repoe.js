import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Repoe(){
    const [repoe, setRepoe] = useState([])

    useEffect(() => {
        loadRepoe();
    }, [])

    const loadRepoe = async () => {
        const result = await axios.get("http://localhost:8080/repoem")
        setRepoe(result.data)
    }

    return (
        <div className='conteiner'>

            <h1 className='text-center mt-4'>Reposições</h1>

            <Link className="btn btn-success mb-2" to="/addrepoe">Adicionar</Link>

            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th>Id Estoque Produto</th>
                            <th>Id Devolução Cliente</th>
                            <th>Estoquista CPF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repoe.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id_estoque_produto}</td>
                                <td>{item.id_dev_cliente}</td>
                                <td>{item.estoque_cpf}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}