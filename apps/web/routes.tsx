import { SidebarProvider } from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/use-auth'
import { NotFound } from '@/pages/404'
import { SignIn } from '@/pages/_auth'
import { SignUp } from '@/pages/_auth/sign-up'
import AppLayout from '@/pages/_layouts/app'
import { AuthLayout } from '@/pages/_layouts/auth'
import { Persons } from '@/pages/app/persons'
import { Error as ErrorPage } from '@/pages/error'
import { getValue } from '@/utils'
import { ReactNode, useMemo } from 'react'
import { createBrowserRouter, useNavigate } from 'react-router-dom'

type AuthenticatedRouteProps = {
  element: ReactNode
}

function AuthenticatedRoute({ element }: AuthenticatedRouteProps) {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const accessToken = useMemo(
    () => getValue<string>('access_token@stefanini-group'),
    []
  )
  if (!accessToken) {
    signOut(() => navigate('/'))
    return null
  }

  return element
}

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
        element: <AuthenticatedRoute element={<Persons />} />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
