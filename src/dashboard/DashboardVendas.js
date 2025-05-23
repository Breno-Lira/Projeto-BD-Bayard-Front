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
  const [itemvenda, setVendaItem] = useState([])
  const [abaAtiva, setAbaAtiva] = useState('resumo')
  const [produtos, setProdutos] = useState([])

  const [mostrarValorPorMes, setMostrarValorPorMes] = useState(true)
  const [mostrarValorPorVendedor, setMostrarValorPorVendedor] = useState(true)

  useEffect(() => {
    loadVendas()
    loadVendedores()
    loadVendaItem()
    loadProdutos()
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

  const loadVendaItem = async () => {
    try {
      const result = await axios.get("http://localhost:8080/vendasItens")
      setVendaItem(result.data)
    } catch (err) {
      console.error("Erro ao carregar itens de venda", err)
    }
  }

  const loadProdutos = async () => {
    try {
      const result = await axios.get("http://localhost:8080/produtos2")
      setProdutos(result.data)
    } catch (err) {
      console.error("Erro ao carregar produtos", err)
    }
  }

  const totalVendas = vendas.reduce((acc, v) => acc + v.valorSubtotal, 0)
  const quantidadeVendas = vendas.length
  const quantidadeTotalProdutos = itemvenda.reduce((acc, item) => acc + item.qtdVendaItem, 0)
  const ticketMedio = quantidadeTotalProdutos > 0 ? totalVendas / quantidadeTotalProdutos : 0

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
    if (existente) {
      existente.valor += venda.valorSubtotal
      existente.quantidade += 1
    } else {
      acc.push({ mes: chave, valor: venda.valorSubtotal, quantidade: 1 })
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
      existente.quantidade += 1
    } else {
      acc.push({ vendedor: nomeVendedor, total: venda.valorSubtotal, quantidade: 1 })
    }
    return acc
  }, [])

  const topProdutosMaisVendidos = itemvenda.reduce((acc, item) => {
    const produtoObj = produtos.find(p => p.codigo === item.codigo_produto)
    if (produtoObj) {
      const existente = acc.find(p => p.nome === produtoObj.nome)
      if (existente) {
        existente.quantidade += item.qtdVendaItem
      } else {
        acc.push({ nome: produtoObj.nome, quantidade: item.qtdVendaItem })
      }
    }
    return acc
  }, []).sort((a, b) => b.quantidade - a.quantidade).slice(0, 10)

  const cores = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d0ed57']

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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      overflowY: 'auto',
    },
    titulo: {
      fontSize: '1.8rem',
      marginBottom: 25,
      color: '#333',
      alignSelf: 'flex-start',
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
      width: '100%',
    },
    botaoToggle: {
      marginBottom: '10px',
      backgroundColor: '#e53935',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '8px 16px',
      cursor: 'pointer',
      fontWeight: '600',
      boxShadow: '0 3px 6px rgba(229, 57, 53, 0.4)',
      userSelect: 'none',
      transition: 'background-color 0.3s, box-shadow 0.3s',
    }
  }

  // Funções para hover do botão, com React, normalmente usaríamos CSS ou biblioteca,
  // mas aqui vamos usar estado simples para hover:
  const [hoverBtnMes, setHoverBtnMes] = useState(false)
  const [hoverBtnVendedor, setHoverBtnVendedor] = useState(false)

  return (
    <div style={estilos.container}>
      <nav style={estilos.sidebar}>
        <a style={abaAtiva === 'resumo' ? { ...estilos.link, ...estilos.linkAtivo } : estilos.link} onClick={() => setAbaAtiva('resumo')}>Resumo</a>
        <a style={abaAtiva === 'data' ? { ...estilos.link, ...estilos.linkAtivo } : estilos.link} onClick={() => setAbaAtiva('data')}>Vendas por Data</a>
        <a style={abaAtiva === 'mes' ? { ...estilos.link, ...estilos.linkAtivo } : estilos.link} onClick={() => setAbaAtiva('mes')}>Vendas por Mês</a>
        <a style={abaAtiva === 'vendedor' ? { ...estilos.link, ...estilos.linkAtivo } : estilos.link} onClick={() => setAbaAtiva('vendedor')}>Vendas por Vendedor</a>
        <a style={abaAtiva === 'produtos' ? { ...estilos.link, ...estilos.linkAtivo } : estilos.link} onClick={() => setAbaAtiva('produtos')}>Top 10 Produtos</a>
      </nav>

      <main style={estilos.conteudo}>
        {abaAtiva === 'resumo' && (
          <>
            <h2 style={estilos.titulo}>Resumo de Vendas</h2>
            <div style={estilos.resumoItem}>Total vendido: <strong>R$ {totalVendas.toFixed(2)}</strong></div>
            <div style={estilos.resumoItem}>Quantidade de vendas: <strong>{quantidadeVendas}</strong></div>
            <div style={estilos.resumoItem}>Ticket médio por produto: <strong>R$ {ticketMedio.toFixed(2)}</strong></div>
          </>
        )}

        {abaAtiva === 'data' && (
          <>
            <h2 style={estilos.titulo}>Vendas por Data</h2>
            <LineChart width={700} height={350} data={vendasPorData} margin={{ bottom: 80 }} style={{ maxWidth: '700px', width: '100%', margin: '0 auto' }}>
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
            <button
              onClick={() => setMostrarValorPorMes(!mostrarValorPorMes)}
              style={{
                ...estilos.botaoToggle,
                backgroundColor: hoverBtnMes ? '#b71c1c' : '#e53935',
                boxShadow: hoverBtnMes ? '0 4px 8px rgba(183, 28, 28, 0.6)' : '0 3px 6px rgba(229, 57, 53, 0.4)',
              }}
              onMouseEnter={() => setHoverBtnMes(true)}
              onMouseLeave={() => setHoverBtnMes(false)}
            >
              Mostrar por: {mostrarValorPorMes ? 'Quantidade' : 'Valor (R$)'}
            </button>
            <BarChart width={700} height={350} data={vendasPorMes} margin={{ bottom: 80 }} style={{ maxWidth: '700px', width: '100%', margin: '0 auto' }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" angle={-45} textAnchor="end" interval={0} height={70} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={mostrarValorPorMes ? 'valor' : 'quantidade'} fill="#ff7300" />
            </BarChart>
          </>
        )}

        {abaAtiva === 'vendedor' && (
          <>
            <h2 style={estilos.titulo}>Vendas por Vendedor</h2>
            <button
              onClick={() => setMostrarValorPorVendedor(!mostrarValorPorVendedor)}
              style={{
                ...estilos.botaoToggle,
                backgroundColor: hoverBtnVendedor ? '#b71c1c' : '#e53935',
                boxShadow: hoverBtnVendedor ? '0 4px 8px rgba(183, 28, 28, 0.6)' : '0 3px 6px rgba(229, 57, 53, 0.4)',
              }}
              onMouseEnter={() => setHoverBtnVendedor(true)}
              onMouseLeave={() => setHoverBtnVendedor(false)}
            >
              Mostrar por: {mostrarValorPorVendedor ? 'Quantidade' : 'Valor (R$)'}
            </button>
            <PieChart width={450} height={450} style={{ maxWidth: '450px', width: '100%', margin: '0 auto' }}>
              <Pie
                data={vendasPorVendedor}
                dataKey={mostrarValorPorVendedor ? 'total' : 'quantidade'}
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

        {abaAtiva === 'produtos' && (
          <>
            <h2 style={estilos.titulo}>Top 10 Produtos Mais Vendidos</h2>
            <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', maxWidth: '900px', width: '100%' }}>
              {/* Lista */}
              <div style={{ flex: 1 }}>
                {topProdutosMaisVendidos.map((produto, index) => (
                  <div key={index} style={{ ...estilos.resumoItem, marginBottom: 10 }}>
                    {index + 1}. {produto.nome} — {produto.quantidade} vendidos
                  </div>
                ))}
              </div>

              {/* Gráfico */}
              <div style={{ flex: 1 }}>
                <BarChart width={400} height={350} data={topProdutosMaisVendidos} margin={{ bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" angle={-45} textAnchor="end" interval={0} height={90} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantidade" fill="#8884d8">
                    {topProdutosMaisVendidos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
