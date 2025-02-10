import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Ajuste para importar sem a extensão .tsx

// Garantir que o elemento 'root' existe no HTML antes de renderizar
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
