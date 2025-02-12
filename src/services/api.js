const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://agendamento-52fm.onrender.com/api/agendamentos";

export async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
}
