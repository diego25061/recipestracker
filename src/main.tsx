import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './components/routing/AppRouter.tsx'
import { App } from 'antd';

import './main.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <AppRouter />
    </App>
  </StrictMode>,
)