import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

export interface LayoutContentPageProps {
  children: ReactNode;
  titlePage: string;
}

export function LayoutContentPage({
  titlePage,
  children,
}: LayoutContentPageProps) {
  return (
    <>
      <Helmet title={titlePage} />
      {children}
    </>
  );
}
