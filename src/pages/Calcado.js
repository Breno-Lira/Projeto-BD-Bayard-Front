import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Calcados() {

    const [calcados, setCalcados] = useState([])

    useEffect(() => {
        loadCalcados()
    }, [])

    const loadCalcados = async () => {
        const result = await axios.get("http://localhost:8080/calcados")
        setCalcados(result.data)
    }

    const deleteCalcado = async (codigo) => {
        await axios.delete(`http://localhost:8080/calcados/delete/${codigo}`)
        loadCalcados()
    }

    const [search, setSearch] = useState("");

    const handleSearchChange = async (e) => {
        const termo = e.target.value;
        setSearch(termo);

        if (termo.trim() === "") {
            loadCalcados(); // volta lista completa
        } else {
            try {
                const res = await axios.get(`http://localhost:8080/calcados/buscar?termo=${termo}`);
                if (res.status === 204) {
                    setCalcados([]); // limpa lista se não encontrou ninguém
                } else {
                    setCalcados(res.data);
                }
            } catch (error) {
                console.error("Erro na busca:", error);
            }
        }
    };

    return (
        <div className='container'>
            <h1 className='text-center mt-4'>Calçados</h1>

            <Link className="btn btn-success mb-3" to="/addcalcado">Adicionar</Link>

            <div className="px-3 py-3">
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Buscar por nome ou CPF"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>

            <table className="table table-bordered shadow">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Cor1</th>
                        <th>Cor3</th>
                        <th>Preço</th>
                        <th>QtdProduto</th>
                        <th>Gênero</th>
                        <th>Tamanho</th>
                        <th>Faixa Etária</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        calcados.map((calcado, index) => (
                            <tr key={index}>
                                <td>{calcado.produto.codigo}</td>
                                <td>{calcado.produto.nome}</td>
                                <td>{calcado.produto.cor_primaria}</td>
                                <td>{calcado.produto.cor_secundaria}</td>
                                <td>R$ {calcado.produto.preco.toFixed(2)}</td>
                                <td>{calcado.produto.qtdProduto}</td>
                                <td>{calcado.genero}</td>
                                <td>{calcado.tamanho}</td>
                                <td>{calcado.faixaEtaria}</td>
                                <td>
                                    <Link to={`/editcalcado/${calcado.produto.codigo}`} className='btn btn-outline-primary mx-2'>Editar</Link>
                                    <button onClick={() => deleteCalcado(calcado.produto.codigo)} className='btn btn-danger'>Excluir</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
