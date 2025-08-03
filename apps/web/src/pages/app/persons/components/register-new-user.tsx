import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useListBusinessUnitsForSelect } from "@/api/business-unit/list-business-units-for-select";
import { useCreateNewUser } from "@/api/user/create-new-user";
import { FormMessage } from "@/components/form-message";
import { useModal } from "@/components/modal/hooks/use-modal";
import { SelectForm } from "@/components/select-form";
import { Button } from "@/components/ui/button";
import {
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { useAuth } from "@/hooks/use-auth";

const registerNewUserSchema = z
	.object({
		username: z.string().min(1, "Nome de usuário é obrigatório."),
		password: z.string().min(1, "Senha é obrigatória."),
		role: z.enum(["admin", "master", "business_unit", "device_manager"]),
		businessUnitIds: z.array(z.number()).optional().default([]),
	})
	.superRefine((data, ctx) => {
		if (
			data.role === "business_unit" &&
			(!data.businessUnitIds || data.businessUnitIds.length === 0)
		) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Selecione pelo menos uma revenda",
				path: ["businessUnitIds"],
			});
		}
	});

type RegisterNewUserSchemaType = z.infer<typeof registerNewUserSchema>;

export function RegisterNewUser() {
	const { closeModal } = useModal();
	const { user } = useAuth();
	const [searchTerm, setSearchTerm] = React.useState("");
	const { data: businessUnits, isLoading: isLoadingBusinessUnits } =
		useListBusinessUnitsForSelect({
			search: searchTerm,
		});

	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<RegisterNewUserSchemaType>({
		defaultValues: {
			password: "",
			role: user?.role === "business_unit" ? "business_unit" : "admin",
			username: "",
			businessUnitIds: [],
		},
		resolver: zodResolver(registerNewUserSchema),
	});

	const selectedRole = watch("role");
	const selectedBusinessUnits = watch("businessUnitIds") || [];

	const { mutateAsync: createNewUser } = useCreateNewUser({
		async onSuccess() {
			reset();
			toast.success("Usuário criado com sucesso!");
			closeModal();
		},
		onError() {
			toast.error("Não foi possível criar o usuário!");
		},
		async onSettled() {
			await queryClient.invalidateQueries({ queryKey: ["fetch-user"] });
		},
	});

	async function handleCreateNewUser(data: RegisterNewUserSchemaType) {
		await createNewUser({
			username: data.username,
			role: data.role,
			password: data.password,
			businessUnitIds: data.businessUnitIds,
		});
	}

	const handleBusinessUnitChange = (value: string | number) => {
		const numericValue = Number(value);
		const currentValues = selectedBusinessUnits;

		if (currentValues.includes(numericValue)) {
			setValue(
				"businessUnitIds",
				currentValues.filter((id) => id !== numericValue),
			);
		} else {
			setValue("businessUnitIds", [...currentValues, numericValue]);
		}
	};

	const handleBusinessUnitSearch = (term: string) => {
		setSearchTerm(term);
	};

	const getRoleOptions = () => {
		if (user?.role === "master") {
			return [
				{ value: "admin", name: "Administrativo" },
				{ value: "master", name: "Smart" },
				{ value: "business_unit", name: "Revendas" },
				{ value: "device_manager", name: "Gerenciador de Dispositivos" },
			];
		}

		if (user?.role === "admin") {
			return [
				{ value: "admin", name: "Administrativo" },
				{ value: "master", name: "Smart" },
				{ value: "business_unit", name: "Revendas" },
				{ value: "device_manager", name: "Gerenciador de Dispositivos" },
			];
		}

		if (user?.role === "business_unit") {
			return [{ value: "business_unit", name: "Revendas" }];
		}

		return [];
	};

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Cadastrar usuário</DialogTitle>
				<DialogDescription>Cadastrar novo usuário</DialogDescription>
			</DialogHeader>
			<form className="space-y-4" onSubmit={handleSubmit(handleCreateNewUser)}>
				<div className="space-y-2">
					<Label htmlFor="username">Nome de Usuário</Label>
					<Input id="username" type="text" {...register("username")} />
					{errors.username && <FormMessage message={errors.username.message} />}
				</div>
				<SelectForm<RegisterNewUserSchemaType>
					control={control}
					name="role"
					label="Tipo"
					placeholder="Selecione um tipo"
					defaultValue={
						user?.role === "business_unit" ? "business_unit" : "admin"
					}
					options={getRoleOptions()}
					error={errors.role}
				/>
				{selectedRole === "business_unit" && (
					<div className="space-y-2">
						<Label>Revendas</Label>
						<MultiSelect
							options={
								businessUnits?.map((unit) => ({
									value: unit.id,
									label: unit.name,
								})) || []
							}
							values={selectedBusinessUnits}
							onChange={handleBusinessUnitChange}
							onSearch={handleBusinessUnitSearch}
							placeholder="Selecione as revendas"
							searchPlaceholder="Digite para buscar revendas..."
							loading={isLoadingBusinessUnits}
							error={!!errors.businessUnitIds}
						/>
						{errors.businessUnitIds && (
							<FormMessage message={errors.businessUnitIds.message} />
						)}
					</div>
				)}
				<div className="space-y-2">
					<Label htmlFor="password">Senha</Label>
					<Input id="password" type="password" {...register("password")} />
					{errors.password && <FormMessage message={errors.password.message} />}
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
	);
}
