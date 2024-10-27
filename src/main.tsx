import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ObtenerUsuario from './pages/ObtenerUsuario.tsx'
import CrearUsuario from './pages/CrearUsuario.tsx'
import ObtenerRecibo from './pages/ObtenerRecibo.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './pages/Login.tsx'

const routes = createBrowserRouter([
  {
    path:'/',
    element: <App />
  },
  {
    path:'/obtener-usuario',
    element: <ObtenerUsuario/>

  },
  {
    path:'/crear-usuario',
    element: <CrearUsuario/>

  },
  {
    path:'/obtener-recibo',
    element: <ObtenerRecibo/>

  },
  {
    path:'/login',
    element: <Login/>
  }
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}>
      </RouterProvider>
    </QueryClientProvider>
  </StrictMode>,
)
