import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'

export function PersonDetailsSkeleton() {
  return (
    <Table>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell className="text-muted-foreground">
              <Skeleton className="h-4 w-28" />
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-4 w-32" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
