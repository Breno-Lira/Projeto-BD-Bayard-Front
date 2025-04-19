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

          <div class="dropdown">
            <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Produtos
            </button>
            <ul className="dropdown-menu">
              <Link to="/produtos" className="dropdown-item">Diversos</Link>
              <li><a className="dropdown-item" href="#">Roupas</a></li>
              <li><a className="dropdown-item" href="#">Calçados</a></li>
            </ul>
          </div>
          
        </div>
      </nav>

    </div>
  )
}
