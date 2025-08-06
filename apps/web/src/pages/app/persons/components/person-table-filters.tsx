import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCallback } from 'react'

const personFiltersSchema = z.object({
  name: z.string().optional(),
  document: z.string().optional(),
  email: z.string().optional(),
})

type PersonFiltersSchema = z.infer<typeof personFiltersSchema>

export function PersonTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const name = searchParams.get('name')
  const document = searchParams.get('document')
  const email = searchParams.get('email')

  const { register, handleSubmit, reset } = useForm<PersonFiltersSchema>({
    resolver: zodResolver(personFiltersSchema),
    defaultValues: {
      name: name ?? '',
      document: document ?? '',
      email: email ?? '',
    },
  })

  const handleFilter = useCallback(
    ({ name, document, email }: PersonFiltersSchema) => {
      setSearchParams((state) => {
        if (name) {
          state.set('name', name)
        } else {
          state.delete('name')
        }

        if (document) {
          state.set('document', document)
        } else {
          state.delete('document')
        }

        if (email) {
          state.set('email', email)
        } else {
          state.delete('email')
        }

        return state
      })
    },
    []
  )

  const handleClearFilters = useCallback(() => {
    setSearchParams((state) => {
      state.delete('name')
      state.delete('document')
      state.delete('email')

      return state
    })

    reset({
      name: '',
      document: '',
      email: '',
    })
  }, [])

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex w-full flex-col gap-3 md:flex-row md:items-end md:justify-start"
    >
      <div className="w-full min-w-0 space-y-2 md:w-[200px]">
        <Input
          id="name"
          label="Nome"
          placeholder="Nome da pessoa"
          {...register('name')}
        />
      </div>
      <div className="w-full min-w-0 space-y-2 md:w-[200px]">
        <Input
          id="document"
          label="CPF"
          placeholder="CPF da pessoa"
          {...register('document')}
        />
      </div>
      <div className="w-full min-w-0 space-y-2 md:w-[200px]">
        <Input
          id="email"
          label="E-mail"
          placeholder="E-mail da pessoa"
          {...register('email')}
        />
      </div>
      <div className="flex w-full gap-2 md:w-auto">
        <Button size="xs" type="submit" className="flex-1 md:flex-none">
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
        <Button
          onClick={handleClearFilters}
          variant="outline"
          size="xs"
          type="button"
          className="flex-1 md:flex-none"
        >
          <X className="mr-2 h-4 w-4" />
          Limpar Filtros
        </Button>
      </div>
    </form>
  )
}
