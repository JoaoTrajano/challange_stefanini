import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export function UserDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">
              Nome de usuário
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-64" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Tipo</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-64" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-64" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">
              Data do cadastro
            </TableCell>
            <TableCell className="flex justify-end">
              <Skeleton className="h-5 w-64" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
