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
        </Routes>
        

    </Router>
    
      
    </div>
  );
}

export default App;
