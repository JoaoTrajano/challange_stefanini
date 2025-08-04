import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import logo from '@/assets/images/logo.webp'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

import type { Item } from './panel-sidebar'

type NavMain = {
  items: Item[]
}

export function NavMain({ items }: NavMain) {
  const navigate = useNavigate()
  const location = useLocation()
  const { open } = useSidebar()

  const isItemMenuActive = useCallback(
    (url: string): boolean => {
      const pathSegments = location.pathname.split('/')
      return pathSegments[2] === url
    },
    [location.pathname]
  )

  const handleItemClick = (item: Item) => {
    navigate(item.url)
  }

  return (
    <SidebarGroup className="flex h-full flex-col">
      <SidebarGroupLabel
        className={cn(
          'flex items-center justify-center',
          open ? 'py-16' : 'py-4'
        )}
      >
        <img src={logo} alt="Logo" />
      </SidebarGroupLabel>
      <SidebarMenu className="space-y-2">
        {items.map((item) => (
          <SidebarMenuItem className="cursor-pointer" key={item.title}>
            <SidebarMenuButton
              tooltip={item.title}
              asChild
              className={cn(
                'flex items-center rounded-md p-3 transition-colors',
                isItemMenuActive(item.url)
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent hover:text-amber-50'
              )}
              onClick={() => handleItemClick(item)}
            >
              <div className="flex items-center">
                {item.icon && <item.icon className="mr-2" />}
                <span className="font-medium">{item.title}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
