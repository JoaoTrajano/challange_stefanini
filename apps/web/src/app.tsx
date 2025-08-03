import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { router } from '../routes'

function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Stefanini Group" />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}

export default App
