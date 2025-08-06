import { ArrowUpDown, EditIcon, PlusCircle, Search, Trash2 } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'

import { FetchPersonParams, useFetchPersons } from '@/api/persons'
import { Person } from '@/api/persons/@types'
import { TableCell } from '@/components/data-table/table-cell'
import { Modal } from '@/components/modal'
import { ModalsType, useModal } from '@/components/modal/hooks/use-modal'
import { Pagination } from '@/components/pagination'
import usePagination, { PER_PAGE } from '@/hooks/use-pagination'
import { formatDateBR } from '@/utils'
import { ColumnDef } from '@tanstack/react-table'
import { useSearchParams } from 'react-router-dom'
import { PageContent } from '../_layout'
import { Content } from '../_layout/content'
import { Header } from '../_layout/header'
import {
  DeletePerson,
  EditePerson,
  PersonDetails,
  PersonTableFilters,
  RegisterNewPerson,
} from './components'

export function Persons() {
  const { openModal: open } = useModal()
  const [searchParams] = useSearchParams()

  const [selectedPersonId, setSelectedPersonId] = useState<string>('')
  const [selectedPersonName, setSelectedPersonName] = useState<string>('')

  const { currentPage, goToNextPage, goToPreviousPage, updateTotalRegister } =
    usePagination()

  const params: FetchPersonParams = useMemo(() => {
    if (searchParams) {
      const name = searchParams.get('name')
      const email = searchParams.get('email')
      const document = searchParams.get('document')

      return { name, email, document }
    }

    return {}
  }, [searchParams])

  const { data: responseFetchPersons, isLoading } = useFetchPersons({
    page: String(currentPage),
    perPage: String(PER_PAGE),
    document: params.document,
    email: params.email,
    name: params.name,
  })
  const [persons, count] = useMemo(() => {
    if (responseFetchPersons) {
      updateTotalRegister(responseFetchPersons.count)
      return [responseFetchPersons.value, responseFetchPersons.count]
    }
    return [[], 0]
  }, [responseFetchPersons])

  const openModal = useCallback(
    (type: ModalsType) => {
      open(type)
    },
    [open]
  )

  const columns: ColumnDef<Person>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
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
        accessorKey: 'birthDate',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
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
        accessorKey: 'details',
        header: 'Detalhes',
        cell: ({ row }) => (
          <div className="min-w-[80px]">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                setSelectedPersonId(row.original.id)
                openModal('PersonDetails')
              }}
            >
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes da pessoa</span>
            </Button>
          </div>
        ),
      },
      {
        accessorKey: 'edit',
        header: 'Editar',
        cell: ({ row }) => (
          <div className="min-w-[80px]">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                setSelectedPersonId(row.original.id)
                openModal('EditePerson')
              }}
            >
              <EditIcon className="h-3 w-3" />
              <span className="sr-only">Editar pessoa</span>
            </Button>
          </div>
        ),
      },
      {
        accessorKey: 'remove',
        header: 'Excluír',
        cell: ({ row }) => (
          <div className="min-w-[80px]">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                setSelectedPersonId(row.original.id)
                setSelectedPersonName(row.original.name)
                openModal('DeletePerson')
              }}
            >
              <Trash2 className="h-3 w-3 text-red-500 hover:text-red-600" />
              <span className="sr-only">Excluir pessoa</span>
            </Button>
          </div>
        ),
      },
    ],
    [openModal]
  )

  return (
    <PageContent titlePage="Pessoas">
      <Header className="flex-col items-end gap-4 sm:flex-row">
        <PersonTableFilters />
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
        <DataTable columns={columns} data={persons} loadingData={isLoading} />
        <Pagination
          nextPage={goToNextPage}
          previousPage={goToPreviousPage}
          page={currentPage}
          total={count}
        />
      </Content>
      <Modal modal="RegisterPerson">
        <RegisterNewPerson />
      </Modal>
      <Modal modal="EditePerson">
        <EditePerson personId={selectedPersonId} />
      </Modal>
      <Modal modal="DeletePerson">
        <DeletePerson name={selectedPersonName} personId={selectedPersonId} />
      </Modal>
      <Modal modal="PersonDetails">
        <PersonDetails personId={selectedPersonId} />
      </Modal>
    </PageContent>
  )
}
