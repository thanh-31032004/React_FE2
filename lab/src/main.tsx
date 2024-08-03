import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LoadingProvider } from './context/loading.tsx'
import { UserProvider } from './context/user.tsx'
import { CartProvider } from './context/cart.tsx'
import { configureAxios } from './config/axiosConfig.ts'
configureAxios();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoadingProvider>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </LoadingProvider>
  </React.StrictMode>,
)
