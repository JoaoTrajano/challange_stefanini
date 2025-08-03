import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

export function UserEditeSkeleton() {
  return (
    <div className="space-y-6">
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Nome de Usuário</Label>
          <Skeleton className="w-128 h-8" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Tipo</Label>
          <Skeleton className="w-128 h-8" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button" disabled={true}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={true}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
}
