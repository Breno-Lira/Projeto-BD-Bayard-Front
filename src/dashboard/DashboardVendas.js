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
  const [abaAtiva, setAbaAtiva] = useState('resumo')

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

  // Cálculos
  const totalVendas = vendas.reduce((acc, v) => acc + v.valorSubtotal, 0)
  const quantidadeVendas = vendas.length

  const vendasPorData = vendas.reduce((acc, venda) => {
    const data = venda.dataVenda
    const existente = acc.find(item => item.data === data)
    if (existente) existente.valor += venda.valorSubtotal
    else acc.push({ data: data, valor: venda.valorSubtotal })
    return acc
  }, [])

  const vendasPorMes = vendas.reduce((acc, venda) => {
    const [ano, mes] = venda.dataVenda.split('-')
    const chave = `${ano}-${mes}`
    const existente = acc.find(item => item.mes === chave)
    if (existente) existente.valor += venda.valorSubtotal
    else acc.push({ mes: chave, valor: venda.valorSubtotal })
    return acc
  }, [])

  const vendasPorVendedor = vendas.reduce((acc, venda) => {
    const vendedorCpf = venda.fkVendedorCPF
    const vendedorObj = vendedores.find(v => v.funcionario.cpf === vendedorCpf)
    const nomeVendedor = vendedorObj ? vendedorObj.funcionario.nome : vendedorCpf

    const existente = acc.find(item => item.vendedor === nomeVendedor)
    if (existente) existente.total += venda.valorSubtotal
    else acc.push({ vendedor: nomeVendedor, total: venda.valorSubtotal })
    return acc
  }, [])

  const cores = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d0ed57']

  // Estilos simples para barra lateral e conteúdo
  const estilos = {
    container: {
      display: 'flex',
      height: '100vh',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f5f5f5',
    },
    sidebar: {
      width: 220,
      backgroundColor: '#fff',
      borderRight: '1px solid #ddd',
      paddingTop: 20,
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    },
    link: {
      display: 'block',
      padding: '15px 20px',
      cursor: 'pointer',
      color: '#555',
      textDecoration: 'none',
      fontWeight: 600,
      borderLeft: '4px solid transparent',
      transition: 'all 0.3s',
      userSelect: 'none',
    },
    linkAtivo: {
      backgroundColor: '#e6f7ff',
      color: '#1890ff',
      borderLeft: '4px solid #1890ff',
    },
    conteudo: {
      flexGrow: 1,
      padding: 30,
      overflowY: 'auto',
    },
    titulo: {
      fontSize: '1.8rem',
      marginBottom: 25,
      color: '#333',
    },
    resumoItem: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 8,
      boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
      marginBottom: 20,
      fontSize: '1.2rem',
      color: '#333',
      maxWidth: 400,
    },
  }

  return (
    <div style={estilos.container}>
      <nav style={estilos.sidebar}>
        <a
          style={abaAtiva === 'resumo' ? { ...estilos.link, ...estilos.linkAtivo } : estilos.link}
          onClick={() => setAbaAtiva('resumo')}
        >
          Resumo
        </a>
        <a
          style={abaAtiva === 'data' ? { ...estilos.link, ...estilos.linkAtivo } : estilos.link}
          onClick={() => setAbaAtiva('data')}
        >
          Vendas por Data
        </a>
        <a
          style={abaAtiva === 'mes' ? { ...estilos.link, ...estilos.linkAtivo } : estilos.link}
          onClick={() => setAbaAtiva('mes')}
        >
          Vendas por Mês
        </a>
        <a
          style={abaAtiva === 'vendedor' ? { ...estilos.link, ...estilos.linkAtivo } : estilos.link}
          onClick={() => setAbaAtiva('vendedor')}
        >
          Vendas por Vendedor
        </a>
      </nav>

      <main style={estilos.conteudo}>
        {abaAtiva === 'resumo' && (
          <>
            <h2 style={estilos.titulo}>Resumo de Vendas</h2>
            <div style={estilos.resumoItem}>
              Total vendido: <strong>R$ {totalVendas.toFixed(2)}</strong>
            </div>
            <div style={estilos.resumoItem}>
              Quantidade de vendas: <strong>{quantidadeVendas}</strong>
            </div>
          </>
        )}

        {abaAtiva === 'data' && (
          <>
            <h2 style={estilos.titulo}>Vendas por Data</h2>
            <LineChart width={700} height={350} data={vendasPorData} margin={{ bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" angle={-45} textAnchor="end" interval={0} height={70} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="valor" stroke="#8884d8" />
            </LineChart>
          </>
        )}

        {abaAtiva === 'mes' && (
          <>
            <h2 style={estilos.titulo}>Vendas por Mês</h2>
            <BarChart width={700} height={350} data={vendasPorMes} margin={{ bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" angle={-45} textAnchor="end" interval={0} height={70} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="valor" fill="#ff7300" />
            </BarChart>
          </>
        )}

        {abaAtiva === 'vendedor' && (
          <>
            <h2 style={estilos.titulo}>Vendas por Vendedor</h2>
            <PieChart width={450} height={450}>
              <Pie
                data={vendasPorVendedor}
                dataKey="total"
                nameKey="vendedor"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {vendasPorVendedor.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </>
        )}
      </main>
    </div>
  )
}
