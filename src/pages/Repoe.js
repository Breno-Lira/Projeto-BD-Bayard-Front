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

    const [idEstoqueProduto, setIdEstoqueProduto] = useState("");
    const [idDevCliente, setIdDevCliente] = useState("");
    const [estoquistaCpf, setEstoquistaCpf] = useState("");

    useEffect(() => {
        buscarRepoesFiltrados();
    }, [idEstoqueProduto, idDevCliente, estoquistaCpf]);

    const buscarRepoesFiltrados = async () => {
        try {
            const params = new URLSearchParams();
            if (idEstoqueProduto.trim() !== "") params.append("idEstoqueProduto", idEstoqueProduto);
            if (idDevCliente.trim() !== "") params.append("idDevCliente", idDevCliente);
            if (estoquistaCpf.trim() !== "") params.append("estoquistaCpf", estoquistaCpf);

            const result = await axios.get(`http://localhost:8080/repoem/buscar?${params.toString()}`);
            setRepoe(result.data);
        } catch (error) {
            console.error("Erro ao buscar repoes filtrados:", error);
        }
    };


    return (
        <div className='conteiner'>

            <h1 className='text-center mt-4'>Reposições</h1>

            <Link className="btn btn-success mb-2" to="/addrepoe">Adicionar</Link>

            <div className="row mb-4">
                <div className="col">
                    <label htmlFor="idEstoqueProduto" className="form-label">Buscar por ID Estoque Produto</label>
                    <input
                        type="text"
                        className="form-control"
                        id="idEstoqueProduto"
                        placeholder="Digite o ID do estoque do produto"
                        value={idEstoqueProduto}
                        onChange={(e) => setIdEstoqueProduto(e.target.value)}
                    />
                </div>

                <div className="col">
                    <label htmlFor="idDevCliente" className="form-label">Buscar por ID Devolução Cliente</label>
                    <input
                        type="text"
                        className="form-control"
                        id="idDevCliente"
                        placeholder="Digite o ID da devolução"
                        value={idDevCliente}
                        onChange={(e) => setIdDevCliente(e.target.value)}
                    />
                </div>

                <div className="col">
                    <label htmlFor="estoquistaCpf" className="form-label">Buscar por CPF do Estoquista</label>
                    <input
                        type="text"
                        className="form-control"
                        id="estoquistaCpf"
                        placeholder="Digite o CPF do estoquista"
                        value={estoquistaCpf}
                        onChange={(e) => setEstoquistaCpf(e.target.value)}
                    />
                </div>
            </div>


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
                        {repoe.length > 0 ? (
                            repoe.map((repoe, index) => (
                                <tr key={index}>
                                    <td>{repoe.id_estoque_produto}</td>
                                    <td>{repoe.id_dev_cliente}</td>
                                    <td>{repoe.estoque_cpf}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">Nenhum registro encontrado</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}