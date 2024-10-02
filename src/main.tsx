import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { store } from './store/index.ts';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <NextUIProvider>
        <App />
        <ToastContainer />
      </NextUIProvider>
    </ReduxProvider>
  </StrictMode>
);
