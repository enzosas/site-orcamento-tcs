import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DefaultApp from './pages/orcamento/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DefaultApp />
  </StrictMode>,
)
