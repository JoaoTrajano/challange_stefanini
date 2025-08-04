import { QueryClientProvider } from '@tanstack/react-query'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { router } from '../routes'
import { queryClient } from './lib/react-query'

function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Stefanini Group" />
      <Toaster position="top-center" richColors />

      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
