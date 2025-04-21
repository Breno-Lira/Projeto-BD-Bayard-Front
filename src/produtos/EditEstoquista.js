import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditEstoquista() {

  const navigate = useNavigate();
  const { cpf } = useParams();

  const [estoquista, setEstoquista] = useState({
    funcionario: {
      cpf: "",
      telefone: "",
      nome: "",
      vendedorResponsavel: false,
      chefia: false
    },
    dataUltimoInventario: "",
    acessoEstoque: ""
  });

  const { telefone, nome, vendedorResponsavel, chefia, cpf: cpfFuncionario } = estoquista.funcionario;
  const { dataUltimoInventario, acessoEstoque } = estoquista;

  useEffect(() => {
    if (cpf) {
      loadEstoquista();
    }
  }, [cpf]);
  

  const loadEstoquista = async () => {
    console.log("Carregando estoquista com CPF:", cpf);
    try {
      const result = await axios.get(`http://localhost:8080/estoquista/${cpf}`);
      console.log("Dados carregados:", result.data);
      const data = result.data;
  
      setEstoquista({
        ...data,
        dataUltimoInventario: data.dataUltimoInventario === null ? "" : data.dataUltimoInventario
      });
    } catch (error) {
      console.error("Erro ao carregar estoquista:", error);
    }
  }; 

  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'dataUltimoInventario' || name === 'acessoEstoque') {
      setEstoquista(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setEstoquista(prevState => ({
        ...prevState,
        funcionario: {
          ...prevState.funcionario,
          [name]: value
        }
      }));
    }
  };

  const onCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEstoquista(prevState => ({
      ...prevState,
      funcionario: {
        ...prevState.funcionario,
        [name]: checked
      }
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const estoquistaPayload = {
      funcionario: {
        cpf: estoquista.funcionario.cpf,
        telefone: estoquista.funcionario.telefone,
        nome: estoquista.funcionario.nome,
        vendedorResponsavel: estoquista.funcionario.vendedorResponsavel,
        chefia: estoquista.funcionario.chefia
      },
      dataUltimoInventario: estoquista.dataUltimoInventario,
      acessoEstoque: estoquista.acessoEstoque
    };

    try {
      await axios.put(`http://localhost:8080/estoquista/editar/${cpf}`, estoquistaPayload);
      navigate("/estoquista");
    } catch (error) {
      console.error("Erro ao atualizar estoquista:", error);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-4 shadow'>
          <h2 className="text-center m-4">Editar Estoquista</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <label htmlFor='cpf' className='form-label'>Cpf</label>
              <input
                type="text"
                className='form-control'
                name='cpf'
                value={cpfFuncionario}
                disabled
              />

              <label htmlFor='nome' className='form-label mt-2'>Nome</label>
              <input
                type="text"
                className='form-control'
                name='nome'
                placeholder='Digite o Nome do estoquista'
                value={nome}
                onChange={onInputChange}
                required
              />

              <label htmlFor='telefone' className='form-label mt-2'>Telefone</label>
              <input
                type="text"
                className='form-control'
                name='telefone'
                placeholder='Digite o telefone do estoquista'
                value={telefone}
                onChange={onInputChange}
                required
              />

              <label htmlFor='dataUltimoInventario' className='form-label mt-2'>Data do último inventário</label>
              <input
                type="date"
                className='form-control'
                name='dataUltimoInventario'
                value={dataUltimoInventario}
                onChange={onInputChange}
                required
              />

              <label htmlFor='acessoEstoque' className='form-label mt-2'>Acesso ao Estoque</label>
              <input
                type="text"
                className='form-control'
                name='acessoEstoque'
                placeholder='Tem acesso ao estoque'
                value={acessoEstoque}
                onChange={onInputChange}
                required
              />

              <div className="form-check form-check-inline mt-3">
                <label className="form-check-label me-2" htmlFor="vendedorResponsavel">
                  Vendedor Responsável
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="vendedorResponsavel"
                  checked={vendedorResponsavel}
                  onChange={onCheckboxChange}
                  id="vendedorResponsavel"
                />
              </div>

              <div className="form-check form-check-inline">
                <label className="form-check-label me-2" htmlFor="chefia">
                  Chefia
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="chefia"
                  checked={chefia}
                  onChange={onCheckboxChange}
                  id="chefia"
                />
              </div>
            </div>

            <Link to="/estoquista" className='btn btn-outline-danger mx-4'>Cancelar</Link>
            <button type='submit' className='btn btn-outline-success'>Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}