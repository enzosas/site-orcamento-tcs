import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DefaultApp from './DefaultApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DefaultApp />
  </StrictMode>,
)
