import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { memo } from 'react'

const SkeletonRowComponent = memo(() => {
  return (
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
  )
})

SkeletonRowComponent.displayName = 'SkeletonRowComponent'

function PersonDetailsSkeletonComponent() {
  return <Table>{<SkeletonRowComponent />}</Table>
}

export const PersonDetailsSkeleton = memo(PersonDetailsSkeletonComponent)
