import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './components/Root/Root'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import SignUp from './components/SignUp/SignUp'
import ErrorPage from './components/ErrorPage/ErrorPage'
import Cart from './components/Cart/Cart'


const routes = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute><Home /></ProtectedRoute>,
        errorElement: <ErrorPage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/cart',
        element: <Cart />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes} />
)
