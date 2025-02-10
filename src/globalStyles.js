// globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Saira:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Saira', sans-serif; /* Alterado para Saira */

    background-size: cover;
    background-attachment: fixed; /* Mantém o background fixo */
    background-position: center; /* Centraliza a imagem */
    background-repeat: no-repeat; /* Evita repetição da imagem */
    min-height: 100vh; /* Garante que o background cubra toda a altura da tela */
  }

  html, body, #root {
    height: 100%;
  }
`;

export default GlobalStyle;
