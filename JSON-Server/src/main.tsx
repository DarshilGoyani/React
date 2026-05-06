import { createRoot } from 'react-dom/client'
import './index.css'
import {  RouterProvider } from 'react-router'
import { router } from './router/routes'



import { CartProvider } from './utils/CartContext'

createRoot(document.getElementById('root')!).render(
  <CartProvider>
    <RouterProvider router={router}/>
  </CartProvider>
)
