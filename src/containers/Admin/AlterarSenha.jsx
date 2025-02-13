/* eslint-disable @typescript-eslint/no-unused-vars */
import{ useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8);
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #f29f05;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: #d88c04;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const AlterarSenha = () => {
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8090/api/usuarios/senha", {
        email,
        senhaAtual,
        novaSenha,
      });
  
      if (response.status === 200) {
        alert(response.data.message);
        navigate("/login"); // Redirecionar para a página de login após a alteração
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor.");
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Alterar Senha</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha Atual"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Nova Senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          required
        />
        <Button type="submit">Alterar Senha</Button>
      </Form>
    </Container>
  );
};

export default AlterarSenha;