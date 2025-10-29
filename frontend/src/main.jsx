import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Orcamento from './pages/orcamento/App.jsx'
import Login from './pages/login/login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
