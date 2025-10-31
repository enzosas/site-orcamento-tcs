import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Orcamento from './pages/orcamento/App.jsx'
import Login from './pages/login/login.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
)
