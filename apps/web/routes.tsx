import { SidebarProvider } from '@/components/ui/sidebar'
import { NotFound } from '@/pages/404'
import { SignIn } from '@/pages/_auth'
import { SignUp } from '@/pages/_auth/sign-up'
import AppLayout from '@/pages/_layouts/app'
import { AuthLayout } from '@/pages/_layouts/auth'
import { Persons } from '@/pages/app/persons'
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
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '/app',
    element: (
      <SidebarProvider>
        <AppLayout />
      </SidebarProvider>
    ),
    children: [
      {
        index: true,
        element: <Persons />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
