import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts'

export default function Dashboard() {
  const [vendas, setVendas] = useState([])
  const [vendedores, setVendedores] = useState([])

  useEffect(() => {
    loadVendas()
    loadVendedores()
  }, [])

  const loadVendas = async () => {
    try {
      const result = await axios.get("http://localhost:8080/vendas")
      setVendas(result.data)
    } catch (err) {
      console.error("Erro ao carregar vendas", err)
    }
  }

  const loadVendedores = async () => {
    try {
      const result = await axios.get("http://localhost:8080/vendedor")
      setVendedores(result.data)
    } catch (err) {
      console.error("Erro ao carregar vendedores", err)
    }
  }

  const totalVendas = vendas.reduce((acc, v) => acc + v.valorSubtotal, 0)
  const quantidadeVendas = vendas.length

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

  const vendasPorMes = vendas.reduce((acc, venda) => {
    const [ano, mes] = venda.dataVenda.split('-')
    const chave = `${ano}-${mes}`  // formato YYYY-MM
    const existente = acc.find(item => item.mes === chave)
    if (existente) {
      existente.valor += venda.valorSubtotal
    } else {
      acc.push({ mes: chave, valor: venda.valorSubtotal })
    }
    return acc
  }, [])

  const vendasPorVendedor = vendas.reduce((acc, venda) => {
    const vendedorCpf = venda.fkVendedorCPF
    const vendedorObj = vendedores.find(v => v.funcionario.cpf === vendedorCpf)
    const nomeVendedor = vendedorObj ? vendedorObj.funcionario.nome : vendedorCpf

    const existente = acc.find(item => item.vendedor === nomeVendedor)
    if (existente) {
      existente.total += venda.valorSubtotal
    } else {
      acc.push({ vendedor: nomeVendedor, total: venda.valorSubtotal })
    }
    return acc
  }, [])

  const cores = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d0ed57']

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
        <h5>Gráfico: Vendas por Mês</h5>
        <BarChart width={600} height={300} data={vendasPorMes}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="valor" fill="#ff7300" />
        </BarChart>
      </div>

      <div className="mt-5">
        <h5>Gráfico: Vendas por Vendedor (Nome)</h5>
        <PieChart width={400} height={400}>
          <Pie
            data={vendasPorVendedor}
            dataKey="total"
            nameKey="vendedor"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {vendasPorVendedor.map((entry, index) => (
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
