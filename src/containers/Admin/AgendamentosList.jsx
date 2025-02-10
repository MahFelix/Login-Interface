import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ListContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #043647;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ListHeader = styled.h2`
  text-align: center;
  color: #EBC76D;
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: bold;

`;

const ListItem = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
  animation: ${fadeIn} 0.5s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin: 0;
    color: #007bff;
    font-size: 1.5rem;
  }

  p {
    margin: 5px 0;
    color: #555;
    font-size: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
  background-color: #ffc107;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0a800;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e60000;
  }
`;

const EditForm = styled.form`
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;

  input, textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Timer = styled.div`
  font-size: 1rem;
  color: #333;
  margin-top: 10px;
`;

const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in-out;
  z-index: 1000;
`;

const FormContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #D8DEE9;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #003c2a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const TextContent = styled.h1`
display: flex;
align-items: center;
justify-content: center;
margin-top: 10px;
margin-bottom: 15px;
font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`

const AgendamentosList = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomePaciente: '',
    emailPaciente: '',
    dataHora: '',
    observacoes: ''
  });

  const [nomePaciente, setNomePaciente] = useState('');
  const [emailPaciente, setEmailPaciente] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      const agendamento = { nomePaciente, emailPaciente, dataHora, observacoes };
      await axios.post('https://scheduling-system-three.vercel.app/api/agendamentos', agendamento);
      alert('Agendamento criado com sucesso!');
  };

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await axios.get('https://scheduling-system-three.vercel.app/api/agendamentos');
        setAgendamentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };

    fetchAgendamentos();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const checkNotifications = () => {
      const now = new Date();
      agendamentos.forEach((agendamento) => {
        const agendamentoDate = new Date(agendamento.dataHora);
        const diffInHours = (agendamentoDate - now) / (1000 * 60 * 60);

        if (diffInHours <= 24 && diffInHours > 0) {
          setNotification(`Consulta com ${agendamento.nomePaciente} em ${Math.floor(diffInHours)} horas`);
          setTimeout(() => setNotification(null), 5000);
        }
      });
    };

    const interval = setInterval(checkNotifications, 60000);
    return () => clearInterval(interval);
  }, [agendamentos]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://scheduling-system-three.vercel.app/api/agendamentos/${id}`);
      setAgendamentos(agendamentos.filter((agendamento) => agendamento.id !== id));
    } catch (error) {
      console.error('Erro ao excluir agendamento:', error);
    }
  };

  const handleEditClick = (agendamento) => {
    setEditing(agendamento.id);
    setFormData({
      nomePaciente: agendamento.nomePaciente,
      emailPaciente: agendamento.emailPaciente,
      dataHora: agendamento.dataHora,
      observacoes: agendamento.observacoes
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://scheduling-system-three.vercel.app/api/agendamentos/${editing}`, formData);
      setAgendamentos(agendamentos.map((agendamento) =>
        agendamento.id === editing ? { ...agendamento, ...formData } : agendamento
      ));
      setEditing(null);
    } catch (error) {
      console.error('Erro ao editar agendamento:', error);
    }
  };

  const calculateTimeLeft = (dateTime) => {
    const now = new Date();
    const agendamentoDate = new Date(dateTime);
    const diffInMs = agendamentoDate - now;

    if (diffInMs <= 0) {
      return 'Consulta realizada';
    }

    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
     <FormContainer>
            <TextContent>
                CADASTRO DE CONSULTA
            </TextContent>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Nome do Paciente"
                    value={nomePaciente}
                    onChange={(e) => setNomePaciente(e.target.value)}
                />
                <Input
                    type="email"
                    placeholder="Email do Paciente"
                    value={emailPaciente}
                    onChange={(e) => setEmailPaciente(e.target.value)}
                />
                <Input
                    type="datetime-local"
                    value={dataHora}
                    onChange={(e) => setDataHora(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Observações"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                />
                <Button type="submit">Agendar</Button>
            </Form>
        </FormContainer>

    <ListContainer>
      <ListHeader>AGENDAMENTOS</ListHeader>
      {notification && <Notification>{notification}</Notification>}
      {agendamentos.map((agendamento) => (
        <ListItem key={agendamento.id}>
          <h3>{agendamento.nomePaciente}</h3>
          <p><strong>Email:</strong> {agendamento.emailPaciente}</p>
          <p><strong>Data e Hora:</strong> {new Date(agendamento.dataHora).toLocaleString()}</p>
          <p><strong>Observações:</strong> {agendamento.observacoes}</p>
          <Timer>
            <strong>Tempo restante:</strong> {calculateTimeLeft(agendamento.dataHora)}
          </Timer>
          <ButtonContainer>
            <EditButton onClick={() => handleEditClick(agendamento)}>Editar</EditButton>
            <DeleteButton onClick={() => handleDelete(agendamento.id)}>Excluir</DeleteButton>
          </ButtonContainer>
        </ListItem>
      ))}
      {editing && (
        <EditForm onSubmit={handleSubmitEdit}>
          <h3>Editar Agendamento</h3>
          <label>Nome do Paciente</label>
          <input
            type="text"
            name="nomePaciente"
            value={formData.nomePaciente}
            onChange={handleFormChange}
          />
          <label>Email do Paciente</label>
          <input
            type="email"
            name="emailPaciente"
            value={formData.emailPaciente}
            onChange={handleFormChange}
          />
          <label>Data e Hora</label>
          <input
            type="datetime-local"
            name="dataHora"
            value={formData.dataHora}
            onChange={handleFormChange}
          />
          <label>Observações</label>
          <textarea
            name="observacoes"
            value={formData.observacoes}
            onChange={handleFormChange}
          />
          <button type="submit">Salvar Alterações</button>
        </EditForm>
      )}
    </ListContainer>

    </>
  );
};

export default AgendamentosList;