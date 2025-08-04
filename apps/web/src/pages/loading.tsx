import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function Loading() {
  const skeletonClasses =
    'bg-primary/40 animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite] hover:bg-primary/50 transition-colors'

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <Skeleton className={cn('h-10 w-64', skeletonClasses)} />
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="mt-4 flex flex-1 flex-col gap-4 p-4 pt-0">
        <Skeleton className={cn('h-10 w-full', skeletonClasses)} />
        <Skeleton className={cn('mt-8 h-full w-full', skeletonClasses)} />
      </main>
    </SidebarInset>
  )
}
