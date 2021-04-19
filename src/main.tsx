import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import { Reset } from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    display: flex;
    min-height: 100vh;
    min-width: 100vw;
    justify-content: center;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Reset />
      <GlobalStyle />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
