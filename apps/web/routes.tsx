import { NotFound } from '@/pages/404'
import { AuthLayout } from '@/pages/_layouts/auth'
import { SignIn } from '@/pages/auth'
import { Error as ErrorPage } from '@/pages/error'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
