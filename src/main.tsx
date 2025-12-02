import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './components/routing/AppRouter.tsx'
import { App } from 'antd';

import './main.css'
import { ControlBar } from './components/ControlBar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <AppRouter />
      <ControlBar />
    </App>
  </StrictMode>,
)