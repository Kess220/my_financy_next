import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(to bottom, #00d87a, #30437c 80%);
    font-family: 'Roboto', sans-serif;
    height: 100vh;
    margin: 0; /* Remove margin to avoid scrollbars */
    overflow: hidden; /* Hide overflow to prevent scrollbars */
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
