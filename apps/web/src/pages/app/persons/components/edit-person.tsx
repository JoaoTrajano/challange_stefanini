import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { useEditPerson, useGetPerson } from '@/api/persons'
import { FormMessage } from '@/components'
import { DatePicker } from '@/components/date-picker'
import { useModal } from '@/components/modal/hooks/use-modal'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  updatePersonParamsSchema,
  UpdatePersonParamsSchema,
} from '@people-management/validations'
import { useEffect } from 'react'
import { EditPersonFormSkeleton } from './person-edit-skeleton'

export type EditePersonProps = {
  personId: string
  open: boolean
}

export function EditePerson({ personId, open }: EditePersonProps) {
  const { closeModal } = useModal()
  const queryClient = useQueryClient()

  const {
    control,
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
  } = useForm<UpdatePersonParamsSchema>({
    resolver: zodResolver(updatePersonParamsSchema),
    defaultValues: {},
  })

  const { data: responseGetPerson, isLoading } = useGetPerson(
    { personId },
    { enabled: open }
  )

  const { mutateAsync: editPerson } = useEditPerson({
    onSuccess() {
      toast.success('Dados editados com sucesso!')
      closeModal()
      queryClient.invalidateQueries({ queryKey: ['fetch-persons'] })
    },
    onError() {
      toast.error('Não foi possível editar os dados da pessoa!')
    },
  })

  const handleEditPerson = async (data: UpdatePersonParamsSchema) => {
    await editPerson({
      personId,
      ...data,
    })
  }

  useEffect(() => {
    if (responseGetPerson) {
      reset({
        name: responseGetPerson.value.name,
        birthDate: responseGetPerson.value.birthDate,
        birthplace: responseGetPerson.value.birthplace ?? undefined,
        email: responseGetPerson.value.email ?? undefined,
        gender: responseGetPerson.value.gender ?? undefined,
        nationality: responseGetPerson.value.nationality ?? undefined,
      })
    }
  }, [responseGetPerson, reset, personId])

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Pessoa</DialogTitle>
        <DialogDescription>Editar dados da pessoa</DialogDescription>
      </DialogHeader>
      {responseGetPerson && (
        <div className="space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit(handleEditPerson)}>
            <Input
              id="name"
              type="text"
              label="Nome da pessoa"
              {...register('name')}
            />
            {errors.name && <FormMessage message={errors.name.message} />}
            <Input
              id="email"
              type="email"
              {...register('email')}
              label="E-mail"
            />
            {errors.email && <FormMessage message={errors.email.message} />}
            <DatePicker<UpdatePersonParamsSchema>
              control={control}
              name="birthDate"
              label="Data de Aniversário"
            />
            {errors.birthDate && (
              <FormMessage message={errors.birthDate.message} />
            )}
            <div className="space-y-2">
              <Label htmlFor="gender">Genêro</Label>
              <Input id="gender" type="text" {...register('gender')} />
              {errors.gender && <FormMessage message={errors.gender.message} />}
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthplace">Naturalidade</Label>
              <Input id="birthplace" type="text" {...register('birthplace')} />
              {errors.birthplace && (
                <FormMessage message={errors.birthplace.message} />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nacionalidade</Label>
              <Input
                id="nationality"
                type="text"
                {...register('nationality')}
              />
              {errors.nationality && (
                <FormMessage message={errors.nationality.message} />
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" variant="success" disabled={isSubmitting}>
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </div>
      )}
      {isLoading && <EditPersonFormSkeleton />}
    </DialogContent>
  )
}
