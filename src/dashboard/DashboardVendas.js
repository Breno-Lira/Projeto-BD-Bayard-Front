
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'

export default function Dashboard() {
  const [vendas, setVendas] = useState([])

  useEffect(() => {
    loadVendas()
  }, [])

  const loadVendas = async () => {
    try {
      const result = await axios.get("http://localhost:8080/vendas")
      setVendas(result.data)
    } catch (err) {
      console.error("Erro ao carregar vendas", err)
    }
  }

  // 📊 Cálculo direto no frontend:
  const totalVendas = vendas.reduce((acc, v) => acc + v.valorSubtotal, 0)
  const quantidadeVendas = vendas.length

  // 📅 Agrupamento por data:
  const vendasPorData = vendas.reduce((acc, venda) => {
    const data = venda.dataVenda
    const existente = acc.find(item => item.data === data)
    if (existente) {
      existente.valor += venda.valorSubtotal
    } else {
      acc.push({ data: data, valor: venda.valorSubtotal })
    }
    return acc
  }, [])

  // 🧑 Agrupamento por vendedor:
  const vendasPorVendedor = vendas.reduce((acc, venda) => {
    const vendedor = venda.fkVendedorCPF
    const existente = acc.find(item => item.vendedor === vendedor)
    if (existente) {
      existente.total += venda.valorSubtotal
    } else {
      acc.push({ vendedor: vendedor, total: venda.valorSubtotal })
    }
    return acc
  }, [])

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Dashboard de Vendas</h2>

      <div className="mb-4">
        <h4>Total vendido: R$ {totalVendas.toFixed(2)}</h4>
        <h4>Quantidade de vendas: {quantidadeVendas}</h4>
      </div>

      <div className="mt-5">
        <h5>Gráfico: Vendas por Data</h5>
        <LineChart width={600} height={300} data={vendasPorData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="valor" stroke="#8884d8" />
        </LineChart>
      </div>

      <div className="mt-5">
        <h5>Gráfico: Vendas por Vendedor (CPF)</h5>
        <BarChart width={600} height={300} data={vendasPorVendedor}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="vendedor" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  )
}
