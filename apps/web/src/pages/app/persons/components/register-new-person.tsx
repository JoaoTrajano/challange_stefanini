import { useCreateNewPerson } from '@/api/persons'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Person, personSchema } from '@people-management/validations'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function RegisterNewPerson() {
  const { closeModal } = useModal()

  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<Person>({
    resolver: zodResolver(personSchema),
  })

  const { mutateAsync: createNewUser } = useCreateNewPerson({
    async onSuccess() {
      reset()
      toast.success('Pessoa registrada com sucesso!')
      closeModal()
    },
    onError() {
      toast.error('Não foi possível realizar o registro da pessoa!')
    },
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: ['fetch-persons'] })
    },
  })

  async function handleCreateNewUser(data: Person) {
    await createNewUser(data)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cadastrar pessoa</DialogTitle>
        <DialogDescription>Cadastrar uma nova pessoa</DialogDescription>
      </DialogHeader>
      <form className="space-y-4" onSubmit={handleSubmit(handleCreateNewUser)}>
        <Input
          id="name"
          type="text"
          label="Nome da pessoa"
          {...register('name')}
          required
        />
        {errors.name && <FormMessage message={errors.name.message} />}
        <Input
          id="document"
          type="text"
          {...register('document')}
          required
          label="CPF"
        />
        {errors.document && <FormMessage message={errors.document.message} />}
        <Input id="email" type="email" {...register('email')} label="E-mail" />
        {errors.email && <FormMessage message={errors.email.message} />}
        <DatePicker<Person>
          control={control}
          name="birthDate"
          label="Data de Aniversário"
        />
        {errors.birthDate && <FormMessage message={errors.birthDate.message} />}
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
          <Input id="nationality" type="text" {...register('nationality')} />
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
    </DialogContent>
  )
}
