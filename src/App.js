import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from './layout/Navbar';
import Inicio from './pages/Inicio';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AddUser from './cliente/AddUser';
import EditUser from './cliente/EditUser';
import HomePage from './pages/HomePage';


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
      </Routes>

    </Router>
    
      
    </div>
  );
}

export default App;
