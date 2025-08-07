import { useGetPerson } from '@/api/persons'
import { useModal } from '@/components/modal/hooks/use-modal'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { formatDateBR } from '@/utils'
import { memo, useMemo } from 'react'
import { PersonDetailsSkeleton } from './person-details-skeleton'

export interface PersonDetailsProps {
  personId: string
}

function PersonDetailsComponent({ personId }: PersonDetailsProps) {
  const { isOpen } = useModal()

  const { data: responsePerson, isLoading } = useGetPerson(
    { personId },
    { enabled: isOpen }
  )
  const person = useMemo(
    () => (responsePerson ? responsePerson.value : undefined),
    [responsePerson]
  )

  console.log(person)

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pessoa: {personId}</DialogTitle>
        <DialogDescription>Detalhes da pessoa</DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        {person && (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="flex justify-end">
                  {person.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Genêro</TableCell>
                <TableCell className="flex justify-end">
                  {person.gender}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Naturalidade
                </TableCell>
                <TableCell className="flex justify-end">
                  {person.birthplace}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Nacionalidade
                </TableCell>
                <TableCell className="flex justify-end">
                  {person.nationality}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Data do cadastro
                </TableCell>
                <TableCell className="flex justify-end">
                  {formatDateBR(person.createdAt)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
        {isLoading && <PersonDetailsSkeleton />}
      </div>
    </DialogContent>
  )
}

export const PersonDetails = memo(PersonDetailsComponent)
