import { ChevronsUpDown, LogOut } from 'lucide-react'

import { useAccount } from '@/api/auth/account'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/use-auth'
import { abbreviateUserIdentifier, getInitials } from '@/utils'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export function NavUser() {
  const navigate = useNavigate()

  const { signOut } = useAuth()
  const { isMobile } = useSidebar()

  const { data: responseAccount, error } = useAccount()

  if (error) {
    toast.error('Sua sessão expirou. Por favor, faça login novamente.')
    signOut(() => navigate('/'))
    return null
  }

  const [abbreviateName, nameInitials] = useMemo(() => {
    if (!responseAccount) return ['', '']
    if (responseAccount.value.name === '') return ['', '']

    const abbreviateName = abbreviateUserIdentifier(responseAccount.value.name)
    const nameInitials = getInitials(responseAccount.value.name)

    return [abbreviateName, nameInitials]
  }, [responseAccount])

  console.log(responseAccount)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="text-foreground rounded-lg">
                  {nameInitials}
                </AvatarFallback>
              </Avatar>
              <div className="text-muted-foreground grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{abbreviateName}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-muted w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {nameInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {abbreviateName}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              asChild
              className="text-rose-500 dark:text-rose-400"
            >
              <button
                className="w-full"
                onClick={() => signOut(() => navigate(`/`, { replace: true }))}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
