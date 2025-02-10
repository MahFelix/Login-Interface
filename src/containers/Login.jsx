import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { FaHome } from "react-icons/fa"; // Ícone de Home

// Imagem de fundo relacionada à nutrição
import backgroundImage from "../../public/foto.webp"; // Substitua pelo caminho da sua imagem

// Animação de confete
const confettiAnimation = keyframes`
  0% { transform: translateY(0) rotate(0); opacity: 1; }
  100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url(${backgroundImage}) no-repeat center center/cover;
  position: relative;
  overflow: hidden;
`;

const FormContainer = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.548);
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 800px;
  position: relative;
  align-items: center;

  @media (max-width: 480px) {
   height: 100vh;

   background: rgba(255, 255, 255, 0.253);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 50%;

  @media (max-width: 480px) {
   width: 190%;
  }
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #f29f05;
    outline: none;
  }
`;

const Button = styled.button`
  background: #f29f05;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;

  &:hover {
    background: #d88c04;
  transform: scale(1.05);
  }
`;

const ImageSide = styled.div`
  width: 50%;
  background: url("https://via.placeholder.com/400x600.png?text=Nutrição+Imagem") no-repeat center center/cover; // Substitua pelo caminho da sua imagem
`;

const Confetti = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: #ff0;
  border-radius: 50%;
  animation: ${confettiAnimation} 2s ease-out;
  opacity: 0;
`;

const HomeButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #f29f05;
  transition: color 0.3s ease;

  &:hover {
    color: #d88c04;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "nutri@email.com" && password === "2020") {
      localStorage.setItem("authToken", "admin"); // Simulação de token
      setShowConfetti(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        navigate("/Agendamentolist");
      }, 2000);
    } else {
      alert("Credenciais inválidas");
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <Container>
      <FormContainer>
        <HomeButton onClick={handleGoBack}>
          <FaHome /> {/* Ícone de Home */}
        </HomeButton>
        <Form onSubmit={handleLogin}>
          <h2>LOGIN</h2>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Entrar</Button>
        </Form>
        <ImageSide />
      </FormContainer>
      {showConfetti &&
        Array.from({ length: 50 }).map((_, i) => (
          <Confetti
            key={i}
            style={{
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
    </Container>
  );
};

export default Login;