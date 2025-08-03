import { ArrowUpDown, PlusCircle } from 'lucide-react'
import { useMemo } from 'react'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'

import { TableCell } from '@/components/data-table/table-cell'
import { formatDateBR } from '@/utils'
import { PanelPageContent } from '../_layout'
import { Content } from '../_layout/content'
import { Header } from '../_layout/header'
import { UserRole } from './components/user-role'

export function Persons() {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: () => (
          <Button variant="ghost" onClick={() => {}}>
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <TableCell className="min-w-[150px]">{row.original.name}</TableCell>
        ),
      },
      {
        accessorKey: 'document',
        header: () => (
          <Button variant="ghost" onClick={() => {}}>
            CPF
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <TableCell className="min-w-[150px]">
            {row.original.document}
          </TableCell>
        ),
      },
      {
        accessorKey: 'email',
        header: () => (
          <Button variant="ghost" onClick={() => {}}>
            E-mail
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="min-w-[120px]">
            <UserRole role={row.original.role} />
          </div>
        ),
      },
      {
        accessorKey: 'birthDate',
        header: () => (
          <Button variant="ghost" onClick={() => {}}>
            Data de Aniversário
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="min-w-[120px]">
            <UserRole role={row.original.role} />
          </div>
        ),
      },
      {
        accessorKey: 'gender',
        header: () => (
          <Button variant="ghost" onClick={() => {}}>
            Genêro
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="min-w-[120px]">
            <UserRole role={row.original.role} />
          </div>
        ),
      },
      {
        accessorKey: 'birthplace',
        header: () => (
          <Button variant="ghost" onClick={() => {}}>
            Naturalidade
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="min-w-[120px]">
            <UserRole role={row.original.role} />
          </div>
        ),
      },
      {
        accessorKey: 'nationality',
        header: () => (
          <Button variant="ghost" onClick={() => {}}>
            Nacionalidade
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="min-w-[120px]">
            <UserRole role={row.original.role} />
          </div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: () => (
          <Button variant="ghost" onClick={() => {}}>
            Data do Cadastro
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <TableCell className="min-w-[140px]">
            {formatDateBR(row.original.createdAt)}
          </TableCell>
        ),
      },
    ],
    []
  )

  return (
    <PanelPageContent titlePage="Pessoas">
      <Header className="flex-col items-end gap-4 sm:flex-row">
        <Button size="xs" className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>Cadastrar nova pessoa</span>
        </Button>
      </Header>
      <Content>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <DataTable columns={columns} data={[]} loadingData={false} />
          </div>
        </div>
      </Content>
    </PanelPageContent>
  )
}
