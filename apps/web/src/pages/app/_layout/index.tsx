import { memo, type ReactNode } from 'react'

import { LayoutContentPage } from '@/components'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

type PanelPageContentProps = {
  children: ReactNode
  titlePage: string
}

function Content({ titlePage, children }: PanelPageContentProps) {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <h1 className="text-muted-foreground font-mono text-2xl font-medium">
                  {titlePage}
                </h1>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main className="mt-4 flex w-full max-w-full flex-1 flex-col gap-4 overflow-x-hidden p-4 pt-0">
        <LayoutContentPage titlePage={titlePage}>
          <div className="flex w-full max-w-full flex-col gap-4 overflow-x-hidden">
            {children}
          </div>
        </LayoutContentPage>
      </main>
    </>
  )
}

export const PageContent = memo(Content)
