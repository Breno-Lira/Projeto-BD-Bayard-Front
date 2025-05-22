import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell
} from 'recharts'

export default function DashboardEstoque() {
  const [estoqueProduto, setEstoqueProduto] = useState([])
  const [requisita, setRequisita] = useState([])
  const [produtos, setProdutos] = useState([])
  const [fornecedores, setFornecedores] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [estoqueRes, requisitaRes, produtoRes, fornecedorRes] = await Promise.all([
        axios.get("http://localhost:8080/estoque_produto"),
        axios.get("http://localhost:8080/requisita"),
        axios.get("http://localhost:8080/produtos"),
        axios.get("http://localhost:8080/fornecedores")
      ])
      setEstoqueProduto(estoqueRes.data)
      setRequisita(requisitaRes.data)
      setProdutos(produtoRes.data)
      setFornecedores(fornecedorRes.data)
    } catch (err) {
      console.error("Erro ao carregar dados", err)
    }
  }

  const totalEstoque = estoqueProduto.reduce((acc, item) => acc + item.quantidade_produtos, 0)

  const estoquePorFornecedor = estoqueProduto.reduce((acc, item) => {
    const req = requisita.find(r => r.codigoProduto === item.codigo_produto)
    const fornecedorCnpj = req ? req.fornecedorCnpj : null
    const fornecedor = fornecedores.find(f => f.cnpj === fornecedorCnpj)
    const nomeFornecedor = fornecedor ? fornecedor.nome : "Desconhecido"

    const existente = acc.find(entry => entry.fornecedor === nomeFornecedor)
    if (existente) {
      existente.total += item.quantidade_produtos
    } else {
      acc.push({ fornecedor: nomeFornecedor, total: item.quantidade_produtos })
    }
    return acc
  }, [])

  const estoquePorProduto = estoqueProduto.map(item => {
    const produto = produtos.find(p => p.codigo === item.codigo_produto)
    const nomeProduto = produto ? produto.nome : `Produto ${item.codigo_produto}`
    return {
      produto: nomeProduto,
      total: item.quantidade_produtos
    }
  })

  // Novo: Agrupar estoque por categoria/tipo do produto
  const estoquePorCategoria = estoqueProduto.reduce((acc, item) => {
    const produto = produtos.find(p => p.codigo === item.codigo_produto)
    const categoria = produto ? produto.categoria || produto.tipo || "Diversos" : "Diversos" // ajuste conforme sua propriedade real

    const existente = acc.find(entry => entry.categoria === categoria)
    if (existente) {
      existente.total += item.quantidade_produtos
    } else {
      acc.push({ categoria: categoria, total: item.quantidade_produtos })
    }
    return acc
  }, [])

  const cores = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#33AA99']

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
          <XAxis dataKey="fornecedor" angle={-45} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#82ca9d" />
        </BarChart>
      </div>

      <div className="mt-5">
        <h5>Gráfico: Produtos por Nome</h5>
        <LineChart width={600} height={300} data={estoquePorProduto}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="produto" angle={-45} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
        </LineChart>
      </div>

      <div className="mt-5">
        <h5>Gráfico: Estoque por Categoria de Produto</h5>
        <PieChart width={400} height={400}>
          <Pie
            data={estoquePorCategoria}
            dataKey="total"
            nameKey="categoria"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {estoquePorCategoria.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  )
}
