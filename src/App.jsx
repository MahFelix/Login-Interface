import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/containers/Login";
import AgendamentoList from "./containers/Admin/AgendamentosList"; // Ajuste o caminho conforme necessário
import AlterarSenha from "./containers/Admin/AlterarSenha";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Agendamentolist" element={<AgendamentoList />} />
        <Route path="/alterar-senha" element={<AlterarSenha />} />
      </Routes>
    </Router>
  );
}

export default App;
