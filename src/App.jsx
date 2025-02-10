import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/containers/Login";
import AgendamentoList from "./containers/Admin/AgendamentosList"; // Ajuste o caminho conforme necessário

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Agendamentolist" element={<AgendamentoList />} />
      </Routes>
    </Router>
  );
}

export default App;
