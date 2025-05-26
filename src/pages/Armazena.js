import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

export default function Armazena() {

    const [armazena, setArmazena] = useState([])

    const { armazena_id } = useParams()

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

    const [codigoProduto, setCodigoProduto] = useState("");
    const [cpfEstoquista, setCpfEstoquista] = useState("");


    const handleProdutoChange = async (e) => {
        const termo = e.target.value;
        setCodigoProduto(termo);

        if (termo.trim() === "") {
            loadArmazena() // ou um loadAll() se quiser mostrar todos
        }
        else {
            try {
                const res = await axios.get(`http://localhost:8080/armazena/buscar-por-produto?codigo=${termo}`);
                if (res.status === 204) {
                    setArmazena([]); // limpa lista se não encontrou ninguém
                } else {
                    setArmazena(res.data);
                }
            } catch (error) {
                console.error("Erro ao buscar por produto:", error);
            }
        }
    };

    const handleEstoquistaChange = async (e) => {
        const termo = e.target.value;
        setCpfEstoquista(termo);

        if (termo.trim() === "") {
            loadArmazena()

        }
        else {
            try {
                const res = await axios.get(`http://localhost:8080/armazena/buscar-por-estoquista?cpf=${termo}`);
                if (res.status === 204) {
                    setArmazena([]); // limpa lista se não encontrou ninguém
                } else {
                    setArmazena(res.data);
                }
            } catch (error) {
                console.error("Erro ao buscar por estoquista:", error);
            }
        }
    };


    return (
        <div className='container'>

            <h1 className='text-center mt-4'>Armazenametos</h1>

            <Link className="btn btn-success" to="/addarmazena">Adicionar</Link>

            <div className="row">
                 <div className="col">
                    <label>Buscar por CPF do Estoquista</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Digite o CPF"
                        value={cpfEstoquista}
                        onChange={handleEstoquistaChange}
                    />
                </div>

                <div className="col">
                    <label>Buscar por Código do Produto</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Digite o código"
                        value={codigoProduto}
                        onChange={handleProdutoChange}
                    />
                </div>

               
            </div>

            <div className='py-4 px-3'>
                <table className="table table-striped table-bordered border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Cpf do Estoquista</th>
                            <th scope="col">Codigo do Produto</th>
                            <th scope="col">Quantidade</th>
                            <th scope="col">id</th>
                            <th scope="col">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            armazena.map((armazena, index) => (
                                <tr key={index}>
                                    <td>{armazena.estoquista_cpf}</td>
                                    <td>{armazena.codigo_produto}</td>
                                    <td>{armazena.qtdArmazenada}</td>
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


