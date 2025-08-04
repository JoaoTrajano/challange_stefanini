import { ArrowUpDown, PlusCircle } from 'lucide-react'
import { useMemo } from 'react'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'

import { useFetchPersons } from '@/api/persons'
import { Person } from '@/api/persons/@types'
import { TableCell } from '@/components/data-table/table-cell'
import { Modal } from '@/components/modal'
import { useModal } from '@/components/modal/hooks/use-modal'
import {} from '@/components/ui/table'
import { formatDateBR } from '@/utils'
import { ColumnDef } from '@tanstack/react-table'
import { PanelPageContent } from '../_layout'
import { Content } from '../_layout/content'
import { Header } from '../_layout/header'
import { PersonTableFilters } from './components/person-table-filters'
import { RegisterNewPerson } from './components/register-new-person'

export function Persons() {
  const { openModal } = useModal()

  const { data: responseFetchPersons, isLoading } = useFetchPersons({})

  const persons = useMemo(
    () => (responseFetchPersons ? responseFetchPersons.value : []),
    [responseFetchPersons]
  )

  const columns: ColumnDef<Person>[] = useMemo(
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
        header: () => <>CPF</>,
        cell: ({ row }) => (
          <TableCell className="min-w-[150px]">
            {row.original.document}
          </TableCell>
        ),
      },
      {
        accessorKey: 'email',
        header: () => <>E-mail</>,
        cell: ({ row }) => (
          <TableCell className="min-w-[150px]">
            {row.original.email ?? '-'}
          </TableCell>
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
          <TableCell className="min-w-[150px]">
            {formatDateBR(row.original.birthDate)}
          </TableCell>
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
          <TableCell className="min-w-[150px]">
            {row.original.gender ?? '-'}
          </TableCell>
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
          <TableCell className="min-w-[150px]">
            {row.original.birthplace ?? '-'}
          </TableCell>
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
          <TableCell className="min-w-[140px]">
            {row.original.nationality ?? '-'}
          </TableCell>
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
        <div className="w-full sm:w-auto">
          <PersonTableFilters />
        </div>
        <Button
          size="xs"
          className="w-full sm:w-auto"
          onClick={() => openModal('RegisterPerson')}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>Cadastrar nova pessoa</span>
        </Button>
      </Header>
      <Content>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px]">
            <DataTable
              columns={columns}
              data={persons}
              loadingData={isLoading}
            />
          </div>
        </div>
      </Content>
      <Modal modal="RegisterPerson">
        <RegisterNewPerson />
      </Modal>
    </PanelPageContent>
  )
}
