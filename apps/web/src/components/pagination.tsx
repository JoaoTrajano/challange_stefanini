import { ChevronLeft, ChevronRight } from 'lucide-react'

import { PER_PAGE } from '@/hooks/use-pagination'

import { Button } from './ui/button'

interface PaginationProps {
  page: number
  total: number
  nextPage: () => Promise<void> | void
  previousPage: () => Promise<void> | void
  itemsPerPage?: number | string
  showTotal?: boolean
}

export function Pagination({
  page,
  total,
  nextPage,
  previousPage,
  itemsPerPage = PER_PAGE,
}: PaginationProps) {
  const numItemsPerPage = itemsPerPage === 'all' ? total : Number(itemsPerPage)
  const pages = Math.ceil(total / numItemsPerPage) || 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-sm">
        Total de {total} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {page} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => previousPage()}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            onClick={() => nextPage()}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={pages <= page}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
