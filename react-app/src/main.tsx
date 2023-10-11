import React from 'react';
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components';
import { BackgroundBlurProvider, GlobalStyles, lightTheme, MeetingProvider } from 'amazon-chime-sdk-component-library-react';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <BackgroundBlurProvider>
        <MeetingProvider>
          <App />
        </MeetingProvider>
      </BackgroundBlurProvider>
    </ThemeProvider>
  </React.StrictMode>
);
