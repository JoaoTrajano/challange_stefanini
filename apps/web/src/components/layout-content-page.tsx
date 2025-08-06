import { memo, type ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

export interface LayoutContentPageProps {
  children: ReactNode
  titlePage: string
}

function LayoutContent({ titlePage, children }: LayoutContentPageProps) {
  return (
    <>
      <Helmet title={titlePage} />
      {children}
    </>
  )
}

export const LayoutContentPage = memo(LayoutContent)
