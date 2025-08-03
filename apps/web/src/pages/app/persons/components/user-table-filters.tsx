import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { SelectForm } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const userFiltersSchema = z.object({
	username: z.string().optional(),
	status: z.string().optional(),
});

type UserFiltersSchema = z.infer<typeof userFiltersSchema>;

export function UserTableFilters() {
	const [searchParams, setSearchParams] = useSearchParams();

	const username = searchParams.get("username");
	const status = searchParams.get("status");

	const { register, handleSubmit, control, reset } = useForm<UserFiltersSchema>(
		{
			resolver: zodResolver(userFiltersSchema),
			defaultValues: {
				username: username ?? "",
				status: status ?? "all",
			},
		},
	);

	function handleFilter({ username, status }: UserFiltersSchema) {
		setSearchParams((state) => {
			if (username) {
				state.set("username", username);
			} else {
				state.delete("username");
			}

			if (status) {
				state.set("status", status);
			} else {
				state.delete("status");
			}

			return state;
		});
	}

	function handleClearFilters() {
		setSearchParams((state) => {
			state.delete("username");
			state.delete("status");

			return state;
		});

		reset({
			username: "",
			status: "all",
		});
	}

	return (
		<form
			onSubmit={handleSubmit(handleFilter)}
			className="flex w-full flex-col gap-3 md:flex-row md:items-end md:justify-start"
		>
			<div className="w-full min-w-0 space-y-2 md:w-[200px]">
				<SelectForm<UserFiltersSchema>
					control={control}
					name="status"
					placeholder="Status"
					label="Status do Usuário"
					options={[
						{ value: "active", name: "Ativo" },
						{ value: "inactive", name: "Inativo" },
					]}
					includeAllOption
				/>
			</div>
			<div className="w-full min-w-0 space-y-2 md:w-[200px]">
				<Label htmlFor="username">Nome do Usuário</Label>
				<Input
					id="username"
					placeholder="Nome de usuário"
					className="h-8 bg-background"
					{...register("username")}
				/>
			</div>
			<div className="flex w-full gap-2 md:w-auto">
				<Button size="xs" type="submit" className="flex-1 md:flex-none">
					<Search className="mr-2 h-4 w-4" />
					Buscar
				</Button>
				<Button
					onClick={handleClearFilters}
					variant="outline"
					size="xs"
					type="button"
					className="flex-1 md:flex-none"
				>
					<X className="mr-2 h-4 w-4" />
					Limpar Filtros
				</Button>
			</div>
		</form>
	);
}
