import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function Armazena() {

    const [armazena, setArmazena] = useState([])

    const {armazena_id} = useParams()

    useEffect(() => {
        loadArmazena()
    }, [])

    const loadArmazena = async () => {
        const result = await axios.get("http://localhost:8080/armazena")
        setArmazena(result.data)
    }

    const deleteArmazena = async (armazena_id) => {
        await axios.delete(`http://localhost:8080/armazena/delete/${armazena_id}`)
        loadArmazena()
    }

    return (
        <div className='container'>

            <h1 className='text-center mt-4'>Armazenametos</h1>

            <Link className="btn btn-success" to="/addarmazena">Adicionar</Link>

            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Cpf do Estoquista</th>
                            <th scope="col">Codigo do Produto</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            armazena.map((armazena, index) => (
                                <tr key={index}>
                                    <td>{armazena.estoquista_cpf}</td>
                                    <td>{armazena.codigo_produto}</td>
                                    <td>{armazena.qtdarmazena}</td>
                                    <td>{armazena.armazena_id}</td>
                                    <td>
                                        
                                        <button
                                            className='btn btn-danger mx-2'
                                            onClick={() => deleteArmazena(armazena.armazena_id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

