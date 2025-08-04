import { Outlet } from 'react-router-dom'

import logo from '@/assets/images/logo.webp'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 antialiased md:grid-cols-2">
      <div className="border-foreground/5 text-muted-foreground hidden border-r bg-[#121d42] p-4 md:flex md:flex-col md:justify-between md:p-10">
        <div className="flex h-full items-center justify-center">
          <img src={logo} alt="" className="max-w-full" />
        </div>
        <footer className="text-sm">
          Stefanini Group &copy; {new Date().getFullYear()}
        </footer>
      </div>

      <div className="bg-background relative flex min-h-screen flex-col items-center justify-center">
        <div className="absolute top-0 w-full bg-black p-4 md:hidden">
          <div className="mx-auto flex w-full max-w-[200px] items-center justify-center">
            <img src={logo} alt="" className="max-w-full" />
          </div>
        </div>

        <div className="mt-20 w-full p-4 sm:p-8">
          <Outlet />
        </div>

        <footer className="text-muted-foreground mt-8 text-sm md:hidden">
          Stefanini Group &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}
