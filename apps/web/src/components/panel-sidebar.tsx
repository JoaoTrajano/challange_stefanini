import { type LucideIcon, User } from 'lucide-react'
import { type ComponentProps, useMemo } from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from '@/components/ui/sidebar'

import { NavMain } from './nav-main'
import { NavUser } from './nav-user'

export type Item = {
  title: string
  url: string
  icon: LucideIcon
}

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const items: Item[] = useMemo(
    () => [
      {
        title: 'Pessoas',
        url: 'persons',
        icon: User,
      },
    ],
    []
  )

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
