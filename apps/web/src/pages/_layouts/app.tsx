import { Outlet } from 'react-router-dom'

import { AppSidebar } from '@/components/panel-sidebar'
import { SidebarInset } from '@/components/ui/sidebar'

export default function AppLayout() {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </>
  )
}
