import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './components/routing/AppRouter.tsx'
import './main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AppRouter />
  </StrictMode>,
)
