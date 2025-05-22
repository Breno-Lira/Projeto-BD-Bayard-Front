import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddEstoqueProduto() {
  const navigate = useNavigate();

  const [estoqueProduto, setEstoqueProduto] = useState({
    codigo_produto: "",
    quantidade_produtos: ""
  });

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const result = await axios.get("http://localhost:8080/produtos");
      setProdutos(result.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  const onInputChange = (e) => {
    setEstoqueProduto({ ...estoqueProduto, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/estoque_produto/add", {
        codigo_produto: parseInt(estoqueProduto.codigo_produto),
        quantidade_produtos: parseInt(estoqueProduto.quantidade_produtos)
      });
      navigate("/estoqueProduto");
    } catch (error) {
      console.error("Erro ao adicionar produto no estoque:", error);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
          <h2 className='text-center mb-4'>Adicionar Produto ao Estoque</h2>

          <form onSubmit={onSubmit}>
            <div className='mb-3'>
              <label htmlFor='codigo_produto' className='form-label'>Produto</label>
              <select
                className='form-select'
                name='codigo_produto'
                value={estoqueProduto.codigo_produto}
                onChange={onInputChange}
                required
              >
                <option value=''>Selecione um produto</option>
                {produtos.map((produto) => (
                  <option key={produto.codigo} value={produto.codigo}>
                    {produto.nome} (Código: {produto.codigo})
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-3'>
              <label htmlFor='quantidade_produtos' className='form-label'>Quantidade</label>
              <input
                type='number'
                className='form-control'
                name='quantidade_produtos'
                value={estoqueProduto.quantidade_produtos}
                onChange={onInputChange}
                required
                min="0"
              />
            </div>

            <Link to="/estoqueProduto" className='btn btn-outline-danger mx-2'>Cancelar</Link>
            <button type='submit' className='btn btn-success'>Adicionar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
