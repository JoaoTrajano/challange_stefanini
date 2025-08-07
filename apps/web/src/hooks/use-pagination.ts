import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const PER_PAGE = 10

type PaginationSchema = {
  page?: string
  perPage?: string
}

const usePagination = () => {
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [, setSearchParams] = useSearchParams()

  const updateTotalRegister = (total: number) => {
    setTotal(total)
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  const goToNextPage = () => {
    const totalPages = Math.ceil(total / PER_PAGE)
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const resetPage = () => {
    setCurrentPage(1)
  }

  const handleFilter = ({ page, perPage }: PaginationSchema) => {
    setSearchParams((state) => {
      if (page) {
        state.set('page', page)
      } else {
        state.delete('page')
      }

      if (perPage) {
        state.set('perPage', perPage)
      } else {
        state.delete('perPage')
      }
      return state
    })
  }

  useEffect(() => {
    const totalPages = Math.ceil(total / PER_PAGE)
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }

    handleFilter({ page: String(currentPage), perPage: String(PER_PAGE) })
  }, [total, currentPage])

  return {
    currentPage,
    goToPreviousPage,
    goToNextPage,
    resetPage,
    setCurrentPage,
    updateTotalRegister,
  }
}

export default usePagination
