import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { TableSkeleton as Skeleton } from './table-skeleton'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  loadingData: boolean
  rowAttributes?: (row: TData) => React.HTMLAttributes<HTMLTableRowElement>
  enableRowSelection?: boolean
  onRowSelectionChange?: (selectedRows: TData[]) => void
  canSelectRow?: (row: TData) => boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loadingData,
  rowAttributes,
  onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    setRowSelection({})
  }, [data])

  const table = useReactTable({
    data: data || [],
    columns: columns,
    manualPagination: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  })

  useEffect(() => {
    if (onRowSelectionChange) {
      const selectedRows = table
        .getSelectedRowModel()
        .rows.map((row) => row.original)
      onRowSelectionChange(selectedRows)
    }
  }, [table, onRowSelectionChange, rowSelection])

  if (loadingData) return <Skeleton columns={columns} data={[]} />

  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="border-muted overflow-hidden rounded-md border shadow-md">
          <Table className="h-full w-full table-auto text-left text-sm">
            <TableHeader className="bg-sidebar hover:bg-sidebar-accent">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="text-center" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      className="px-4 py-2 text-center font-semibold text-white"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  const rowProps = rowAttributes
                    ? rowAttributes(row.original)
                    : {}

                  return (
                    <TableRow
                      className={`border-b border-gray-200 text-center transition duration-200 ${rowProps.className || ''}`}
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      {...rowProps}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          className="px-4 py-3 text-center text-sm text-gray-700"
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 bg-gray-50 text-center text-black"
                  >
                    Nenhum registro foi encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => {
            return (
              <div
                key={row.id}
                className="border-muted overflow-hidden rounded-md border shadow-md"
              >
                <div className="bg-black px-4 py-2 text-center font-semibold text-white">
                  {/* Header do card */}
                </div>
                <div className="divide-y divide-gray-200">
                  {row.getVisibleCells().map((cell) => {
                    const header = table
                      .getHeaderGroups()[0]
                      .headers.find((h) => h.id === cell.column.id)

                    return (
                      <div
                        key={cell.id}
                        className="flex items-center justify-between px-4 py-3"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {header?.column.columnDef.header
                            ? flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )
                            : ''}
                        </span>
                        <span className="text-sm text-gray-700">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })
        ) : (
          <div className="border-muted h-24 rounded-md border bg-gray-50 text-center text-black">
            Nenhum registro foi encontrado.
          </div>
        )}
      </div>
    </div>
  )
}
