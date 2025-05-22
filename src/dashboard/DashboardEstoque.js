import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

export default function DashboardEstoque() {
  const [estoqueProduto, setEstoqueProduto] = useState([])
  const [requisita, setRequisita] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const estoqueRes = await axios.get("http://localhost:8080/estoque_produto")
      setEstoqueProduto(estoqueRes.data)

      const requisitaRes = await axios.get("http://localhost:8080/requisita")
      setRequisita(requisitaRes.data)
    } catch (err) {
      console.error("Erro ao carregar dados", err)
    }
  }

  const totalEstoque = estoqueProduto.reduce((acc, item) => acc + item.quantidade_produtos, 0)

  const estoquePorFornecedor = estoqueProduto.reduce((acc, item) => {
    const req = requisita.find(r => r.codigoProduto === item.codigo_produto)
    const fornecedor = req ? req.fornecedorCnpj : "Desconhecido"

    const existente = acc.find(entry => entry.fornecedor === fornecedor)
    if (existente) {
      existente.total += item.quantidade_produtos
    } else {
      acc.push({ fornecedor, total: item.quantidade_produtos })
    }
    return acc
  }, [])

  const estoquePorProduto = estoqueProduto.map(item => ({
    produto: item.codigo_produto,
    total: item.quantidade_produtos
  }))

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Dashboard de Estoque Produto</h2>

      <div className="mb-4">
        <h4>Total de produtos no estoque: {totalEstoque}</h4>
        <h4>Quantidade de registros: {estoqueProduto.length}</h4>
      </div>

      <div className="mt-5">
        <h5>Gráfico: Produtos por Fornecedor</h5>
        <BarChart width={600} height={300} data={estoquePorFornecedor}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fornecedor" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#82ca9d" />
        </BarChart>
      </div>

      <div className="mt-5">
        <h5>Gráfico: Produtos por Código</h5>
        <LineChart width={600} height={300} data={estoquePorProduto}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="produto" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  )
}
