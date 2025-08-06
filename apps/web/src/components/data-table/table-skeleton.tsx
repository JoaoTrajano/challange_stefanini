import { ColumnDef, flexRender, HeaderContext } from '@tanstack/react-table'
import { memo, useMemo } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  rows?: number
}

function TableSkeletonComponent<TData, TValue>({
  columns,
  rows = 10,
}: DataTableProps<TData, TValue>) {
  const skeletonRows = useMemo(() => Array.from({ length: rows }), [rows])

  return (
    <div
      className="border-muted overflow-hidden rounded-md border shadow-md"
      aria-busy="true"
      aria-label="Carregando tabela"
    >
      <Table className="w-full table-auto text-left text-sm">
        <TableHeader className="bg-black">
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.id}
                className="px-4 py-2 text-center font-semibold text-white"
              >
                {col.header &&
                  flexRender(col.header, {} as HeaderContext<TData, TValue>)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {skeletonRows.map((_, rowIndex) => (
            <SkeletonRow key={rowIndex} columns={columns.length} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const SkeletonRow = memo(({ columns }: { columns: number }) => (
  <TableRow data-loading={true}>
    {Array.from({ length: columns }).map((_, colIndex) => (
      <TableCell key={colIndex} className="px-4 py-2">
        <Skeleton className="h-10 w-full" />
      </TableCell>
    ))}
  </TableRow>
))

SkeletonRow.displayName = 'SkeletonRow'

export const TableSkeleton = memo(
  TableSkeletonComponent
) as typeof TableSkeletonComponent
