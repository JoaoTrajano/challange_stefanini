import { toast } from 'sonner'

import { useDeletePerson } from '@/api/persons'
import { useModal } from '@/components/modal/hooks/use-modal'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useQueryClient } from '@tanstack/react-query'

type DeletePersonDialogProps = {
  personId: string
  name: string
}

export function DeletePerson({ personId, name }: DeletePersonDialogProps) {
  const { closeModal } = useModal()
  const queryClient = useQueryClient()

  const { mutateAsync: deletePerson, isPending } = useDeletePerson({
    async onSuccess() {
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

  async function handleDeletePerson() {
    await deletePerson({ personId })
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Excluir Person</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja excluir a pessoa: {name}?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="button" variant="ghost" onClick={closeModal}>
          Cancelar
        </Button>
        <Button
          type="button"
          variant="destructive"
          onClick={handleDeletePerson}
          disabled={isPending}
        >
          Excluir
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
