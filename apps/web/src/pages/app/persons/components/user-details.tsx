import { useGetUser } from '@/api/user/get-user-by-id';
import { Status } from '@/components/status';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { formatDateBR } from '@/utils';

import { UserDetailsSkeleton } from './user-details-skeleton';
import { UserRole } from './user-role';

export interface OrderDetailsProps {
  userId: number;
  open: boolean;
}

export function UserDetails({ userId, open }: OrderDetailsProps) {
  const { data: responseUser, isLoading } = useGetUser(
    { userId },
    { enabled: open },
  );

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Usuário: {userId}</DialogTitle>
        <DialogDescription>Detalhes do usuário</DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        {responseUser && (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Nome de usuário
                </TableCell>
                <TableCell className="flex justify-end">
                  {responseUser?.username}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Tipo</TableCell>
                <TableCell className="flex justify-end">
                  <UserRole role={responseUser?.role} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <Status inactived={!!responseUser?.inactivedAt} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground">
                  Data do cadastro
                </TableCell>
                <TableCell className="flex justify-end">
                  {formatDateBR(responseUser?.createdAt)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
        {isLoading && <UserDetailsSkeleton />}
      </div>
    </DialogContent>
  );
}
