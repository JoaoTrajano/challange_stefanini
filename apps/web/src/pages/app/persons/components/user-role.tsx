import type { UserRole as Role } from "@/api/user/@types";

interface UserRoleProps {
	role: Role;
}

export function UserRole({ role }: UserRoleProps) {
	return (
		<>
			{role === "seller" && (
				<span className="text-muted-foreground">Vendedor</span>
			)}
			{role === "admin" && (
				<span className="text-muted-foreground">Administrador(a)</span>
			)}
			{role === "master" && (
				<span className="text-muted-foreground">Smart</span>
			)}
			{role === "business_unit" && (
				<span className="text-muted-foreground">Revenda</span>
			)}
			{role === "device_manager" && (
				<span className="text-muted-foreground">
					Gerenciador de Dispositivos
				</span>
			)}
		</>
	);
}
