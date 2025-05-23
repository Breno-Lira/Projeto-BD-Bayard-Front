import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
} from "recharts"

export default function DashboardEstoque() {
  const [estoqueProduto, setEstoqueProduto] = useState([])
  const [requisita, setRequisita] = useState([])
  const [produtos, setProdutos] = useState([])
  const [fornecedores, setFornecedores] = useState([])
  const [calcados, setCalcados] = useState([])
  const [vestuario, setVestuario] = useState([])
  const [abaAtiva, setAbaAtiva] = useState("resumo")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [
        estoqueRes,
        requisitaRes,
        produtoRes,
        fornecedorRes,
        calcadosRes,
        vestuarioRes,
      ] = await Promise.all([
        axios.get("http://localhost:8080/estoque_produto"),
        axios.get("http://localhost:8080/requisita"),
        axios.get("http://localhost:8080/produtos"),
        axios.get("http://localhost:8080/fornecedores"),
        axios.get("http://localhost:8080/calcados"),
        axios.get("http://localhost:8080/vestuario"),
      ])

      setEstoqueProduto(estoqueRes.data)
      setRequisita(requisitaRes.data)
      setProdutos(produtoRes.data)
      setFornecedores(fornecedorRes.data)
      setCalcados(calcadosRes.data)
      setVestuario(vestuarioRes.data)
    } catch (err) {
      console.error("Erro ao carregar dados", err)
    }
  }

  // Cálculo do total de produtos no estoque
  const totalEstoque = estoqueProduto.reduce(
    (acc, item) => acc + item.quantidade_produtos,
    0
  )

  // Agrupa estoque por fornecedor
  const estoquePorFornecedor = estoqueProduto.reduce((acc, item) => {
    const req = requisita.find((r) => r.codigoProduto === item.codigo_produto)
    const fornecedorCnpj = req ? req.fornecedorCnpj : null
    const fornecedor = fornecedores.find((f) => f.cnpj === fornecedorCnpj)
    const nomeFornecedor = fornecedor ? fornecedor.nome : "Desconhecido"

    const existente = acc.find((entry) => entry.fornecedor === nomeFornecedor)
    if (existente) {
      existente.total += item.quantidade_produtos
    } else {
      acc.push({ fornecedor: nomeFornecedor, total: item.quantidade_produtos })
    }
    return acc
  }, [])

  // Agrupa estoque por produto (nome)
  const estoquePorProduto = estoqueProduto.map((item) => {
    const produto = produtos.find((p) => p.codigo === item.codigo_produto)
    const nomeProduto = produto ? produto.nome : `Produto ${item.codigo_produto}`
    return {
      produto: nomeProduto,
      total: item.quantidade_produtos,
    }
  })

  // Ordena produtos por quantidade (maior para menor) para ranking
  const estoquePorProdutoOrdenado = [...estoquePorProduto].sort(
    (a, b) => b.total - a.total
  )

  // Conjuntos para verificação rápida de categoria
  const codigosCalcados = new Set(calcados.map((c) => c.produto.codigo))
  const codigosVestuario = new Set(vestuario.map((v) => v.produto.codigo))

  // Agrupa estoque por categoria (Calçados, Roupas, Outros)
  const estoquePorCategoria = estoqueProduto.reduce((acc, item) => {
    let categoria = "Outros"
    if (codigosCalcados.has(item.codigo_produto)) categoria = "Calçados"
    else if (codigosVestuario.has(item.codigo_produto)) categoria = "Roupas"

    const existente = acc.find((entry) => entry.categoria === categoria)
    if (existente) {
      existente.total += item.quantidade_produtos
    } else {
      acc.push({ categoria, total: item.quantidade_produtos })
    }
    return acc
  }, [])

  const cores = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA336A",
    "#33AA99",
  ]

  const estilos = {
    container: {
      display: "flex",
      height: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f0f2f5",
    },
    sidebar: {
      width: 220,
      backgroundColor: "#fff",
      borderRight: "1px solid #ddd",
      paddingTop: 20,
      boxShadow: "2px 0 5px rgb(0 0 0 / 0.1)",
    },
    link: {
      display: "block",
      padding: "15px 20px",
      cursor: "pointer",
      color: "#555",
      textDecoration: "none",
      fontWeight: "600",
      borderLeft: "4px solid transparent",
      transition: "all 0.3s",
      userSelect: "none",
    },
    linkAtivo: {
      backgroundColor: "#e6f7ff",
      color: "#1890ff",
      borderLeft: "4px solid #1890ff",
    },
    conteudo: {
      flexGrow: 1,
      padding: 30,
      overflowY: "auto",
    },
    tituloGrafico: {
      fontSize: "1.8rem",
      marginBottom: 25,
      color: "#333",
    },
    resumoItem: {
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 8,
      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      marginBottom: 20,
      fontSize: "1.2rem",
      color: "#333",
    },
    graficoWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      flexDirection: "column",
    },
    tabelaRanking: {
      marginTop: 20,
      width: "80%",
      maxWidth: 700,
      borderCollapse: "collapse",
    },
    th: {
      borderBottom: "2px solid #ccc",
      padding: "8px 12px",
      textAlign: "left",
      backgroundColor: "#f5f5f5",
    },
    td: {
      borderBottom: "1px solid #ddd",
      padding: "8px 12px",
      color: "#333",
    },
  }

  return (
    <div style={estilos.container}>
      <nav style={estilos.sidebar}>
        <a
          style={abaAtiva === "resumo" ? { ...estilos.link, ...estilos.linkAtivo } : estilos.link}
          onClick={() => setAbaAtiva("resumo")}
        >
          Resumo
        </a>
        <a
          style={abaAtiva === "fornecedor" ? { ...estilos.link, ...estilos.linkAtivo } : estilos.link}
          onClick={() => setAbaAtiva("fornecedor")}
        >
          Produtos por Fornecedor
        </a>
        <a
          style={abaAtiva === "produto" ? { ...estilos.link, ...estilos.linkAtivo } : estilos.link}
          onClick={() => setAbaAtiva("produto")}
        >
          Produtos por Nome
        </a>
        <a
          style={abaAtiva === "categoria" ? { ...estilos.link, ...estilos.linkAtivo } : estilos.link}
          onClick={() => setAbaAtiva("categoria")}
        >
          Estoque por Categoria
        </a>
      </nav>

      <main style={estilos.conteudo}>
        {abaAtiva === "resumo" && (
          <>
            <h2 style={estilos.tituloGrafico}>Resumo do Estoque</h2>
            <div style={estilos.resumoItem}>
              Total de produtos no estoque: <strong>{totalEstoque}</strong>
            </div>
            <div style={estilos.resumoItem}>
              Quantidade de registros no estoque: <strong>{estoqueProduto.length}</strong>
            </div>
          </>
        )}

        {abaAtiva === "fornecedor" && (
          <>
            <h2 style={estilos.tituloGrafico}>Produtos por Fornecedor</h2>
            <div style={estilos.graficoWrapper}>
              <BarChart
                width={700}
                height={350}
                data={estoquePorFornecedor}
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="fornecedor"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={70}
                  tick={{ fontSize: 12, fill: "#666" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#666" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#82ca9d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </div>
          </>
        )}

        {abaAtiva === "produto" && (
          <>
            <h2 style={estilos.tituloGrafico}>Produtos por Nome (Ranking por Quantidade)</h2>
            <div style={estilos.graficoWrapper}>
              <LineChart
                width={700}
                height={350}
                data={estoquePorProdutoOrdenado}
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="produto"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={70}
                  tick={{ fontSize: 12, fill: "#666" }}
                />
                <YAxis tick={{ fontSize: 12, fill: "#666" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
              </LineChart>

              {/* Tabela de ranking */}
              <table style={estilos.tabelaRanking}>
                <thead>
                  <tr>
                    <th style={estilos.th}>Produto</th>
                    <th style={estilos.th}>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {estoquePorProdutoOrdenado.map(({ produto, total }) => (
                    <tr key={produto}>
                      <td style={estilos.td}>{produto}</td>
                      <td style={estilos.td}>{total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {abaAtiva === "categoria" && (
          <>
            <h2 style={estilos.tituloGrafico}>Estoque por Categoria de Produto</h2>
            <div style={estilos.graficoWrapper}>
              <PieChart width={450} height={450}>
                <Pie
                  data={estoquePorCategoria}
                  dataKey="total"
                  nameKey="categoria"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                  fill="#8884d8"
                >
                  {estoquePorCategoria.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
