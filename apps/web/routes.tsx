import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from '../web/src/pages/_layouts/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    // errorElement: <ErrorPage />,
    // children: [
    //   {
    //     index: true,
    //     element: <SignIn />,
    //   },
    // ],
  },
])
