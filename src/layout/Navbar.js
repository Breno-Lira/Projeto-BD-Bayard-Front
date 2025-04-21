import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">BAYARD</a>


          <Link className="btn btn-outline-light" to="/">Clientes</Link>
          <Link className="btn btn-outline-light" to="/fornecedores">Fornecedores</Link>
          <Link className="btn btn-outline-light" to="/venda">Venda</Link>

          <div class="dropdown">
            <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Produtos
            </button>
            <ul className="dropdown-menu">
              <Link to="/produtos" className="dropdown-item">Diversos</Link>
              <Link to="/vestuario" className=" dropdown-item">Roupas</Link>
              <Link to="/calcado" className=" dropdown-item">Calçados</Link>
            </ul>
          </div>

          <div class="dropdown">
            <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Funcionarios
            </button>
            <ul className="dropdown-menu">
              <Link to="/vendedor" className="dropdown-item">Vendedor</Link>
              <Link to="/caixa" className=" dropdown-item">Caixa</Link>
              <Link to="/estoquista" className=" dropdown-item">Estoquista</Link>
            </ul>
          </div>
          
        </div>
      </nav>

    </div>
  )
}
