import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"

import App from '../src/App.jsx'
import Start from '../src/pages/start.jsx'
import Language from '../src/pages/language.jsx'
import Home from '../src/pages/home.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "start",
    element: <Start />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "language",
    element: <Language />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "home",
    element: <Home />,
    errorElement: <div>404 Not Found</div>,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
