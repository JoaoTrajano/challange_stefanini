import { useEffect, useState } from 'react'

export const PER_PAGE = 10

const usePagination = () => {
  const [total, setTotal] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

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

  useEffect(() => {
    const totalPages = Math.ceil(total / PER_PAGE)
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
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
