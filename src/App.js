import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './layout/Navbar';
import Inicio from './pages/Inicio';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AddUser from './cliente/AddUser';
import EditUser from './cliente/EditUser';
import HomePage from './pages/HomePage';
import Fornecedores from './pages/Fornecedores';
import AddFornecedor from './fornecedores/AddFornecedor';
import EditFornecedor from './fornecedores/EditFornecedor';
import Produto from './pages/Produto';
import AddProduto from './produtos/AddProduto';
import EditProduto from './produtos/EditProduto';
import Vestuario from './pages/Vestuario';
import AddVestuario from './produtos/AddVestuario';
import EditVestuario from './produtos/EditVestuario';
import Calcado from './pages/Calcado';
import AddCalcado from './produtos/AddCalcado';
import EditCalcado from './produtos/EditCalcado';
import Vendedor from './pages/Vendedor';
import AddVendedor from './produtos/AddVendedor';
import EditVEndedor from './produtos/EditVendedor';
import Venda from './pages/Venda';
import AddVenda from './vendas/AddVenda';

import Caixa from './pages/Caixa';
import AddCaixa from './produtos/AddCaixa';
import EditCaixa from './produtos/EditCaixa';

import Estoquista from './pages/Estoquista';
import AddEstoquista from './produtos/AddEstoquista';
import EditEstoquista from './produtos/EditEstoquista';


function App() {
  return (
    <div className="App">
    <Router>
      <Navbar/>
      
      <Routes>
          <Route exact path="/" element={<Inicio />} />
          <Route exact path="/1" element={<HomePage />} />
          <Route exact path="/addcliente" element={<AddUser />} />
          <Route exact path="/editcliente/:cpf" element={<EditUser />} />
          <Route exact path="/fornecedores" element={<Fornecedores />} />
          <Route exact path="/addfornecedor" element={<AddFornecedor />} />
          <Route exact path="/editfornecedor/:cnpj" element={<EditFornecedor />} />
          <Route exact path="/produtos" element={<Produto />} />
          <Route exact path="/addproduto" element={<AddProduto />} />
          <Route exact path="/editproduto/:codigo" element={<EditProduto />} />
          <Route exact path="/vestuario" element={<Vestuario />} />
          <Route exact path="/addvestuario" element={<AddVestuario />} />
          <Route exact path="/editvestuario/:codigo" element={<EditVestuario />} />
          <Route exact path="/calcado" element={<Calcado />} />
          <Route exact path="/addcalcado" element={<AddCalcado />} />
          <Route exact path="/editcalcado/:codigo" element={<EditCalcado />} />

          <Route exact path="/vendedor" element={<Vendedor />} />
          <Route exact path="/addVendedor" element={<AddVendedor />} />
          <Route exact path="/editVendedor/:cpf" element={<EditVEndedor />} />

          <Route exact path="/venda" element={<Venda />} />
          <Route exact path="/addvenda" element={<AddVenda />} />

          <Route exact path="/caixa" element={<Caixa />} />
          <Route exact path="/addCaixa" element={<AddCaixa />} />
          <Route exact path="/editCaixa/:cpf" element={<EditCaixa />} />

          <Route exact path="/estoquista" element={<Estoquista />} />
          <Route exact path="/addEstoquista" element={<AddEstoquista />} />
          <Route exact path="/editEstoquista/:cpf" element={<EditEstoquista />} />
        </Routes>
        

    </Router>
    
      
    </div>
  );
}

export default App;
