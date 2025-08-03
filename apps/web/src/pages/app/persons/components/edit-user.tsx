import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useListBusinessUnitsForSelect } from "@/api/business-unit/list-business-units-for-select";
import { useEditUser } from "@/api/user/edit-user";
import { useGetUser } from "@/api/user/get-user-by-id";
import { FormMessage } from "@/components/form-message";
import { useModal } from "@/components/modal/hooks/use-modal";
import { SelectForm } from "@/components/select-form";
import { Button } from "@/components/ui/button";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";

import { UserEditeSkeleton } from "./user-edit-skeleton";

const editUserSchema = z
	.object({
		userId: z.number(),
		role: z.enum(["admin", "master", "business_unit", "device_manager"]),
		username: z.string().min(1, "Nome de usuário é obrigatório."),
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

type EditeUserSchemaType = z.infer<typeof editUserSchema>;

export type EditeUserProps = {
	userId: number;
	open: boolean;
};

export function EditeUser({ userId, open }: EditeUserProps) {
	const {
		control,
		formState: { errors, isSubmitting },
		register,
		handleSubmit,
		reset,
		setValue,
		watch,
	} = useForm<EditeUserSchemaType>({
		resolver: zodResolver(editUserSchema),
		defaultValues: {
			username: "",
			role: "admin",
			businessUnitIds: [],
		},
	});
	const { closeModal } = useModal();
	const queryClient = useQueryClient();
	const [searchTerm, setSearchTerm] = React.useState("");

	const selectedRole = watch("role");
	const selectedBusinessUnits = watch("businessUnitIds") || [];

	const { data: businessUnits, isLoading: isLoadingBusinessUnits } =
		useListBusinessUnitsForSelect({
			search: searchTerm,
		});

	const { data: responseUser, isLoading } = useGetUser(
		{
			userId,
		},
		{
			enabled: open,
		},
	);

	const { mutateAsync: editUser } = useEditUser({
		onSuccess() {
			toast.success("Usuário editado com sucesso!");
			closeModal();
			queryClient.invalidateQueries({ queryKey: ["fetch-user"] });
		},
		onError() {
			toast.error("Não foi possível editar o usuário!");
		},
	});

	const handleEditUser = async (data: EditeUserSchemaType) => {
		const { userId: id, ...rest } = data;
		await editUser({
			userId: id,
			...rest,
		});
	};

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

	useEffect(() => {
		if (responseUser) {
			reset({
				userId,
				username: responseUser.username || "",
				role: (responseUser.role === "admin" ||
				responseUser.role === "master" ||
				responseUser.role === "business_unit" ||
				responseUser.role === "device_manager"
					? responseUser.role
					: "admin") as "admin" | "master" | "business_unit" | "device_manager",
				businessUnitIds:
					responseUser.businessUnits?.map((bu) => bu.businessUnit.id) || [],
			});
		}
	}, [responseUser, reset, userId]);

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Editar Usuário</DialogTitle>
				<DialogDescription>Editar dados do usuário</DialogDescription>
			</DialogHeader>
			{responseUser && (
				<div className="space-y-6">
					<form className="space-y-4" onSubmit={handleSubmit(handleEditUser)}>
						<div className="space-y-2">
							<Label htmlFor="username">Nome de Usuário</Label>
							<Input id="username" type="text" {...register("username")} />
							{errors.username && (
								<FormMessage message={errors.username.message} />
							)}
						</div>
						<SelectForm<EditeUserSchemaType>
							control={control}
							name="role"
							label="Tipo"
							placeholder="Selecione um tipo"
							options={[
								{ value: "admin", name: "Administrativo" },
								{ value: "master", name: "Smart" },
								{ value: "business_unit", name: "Revendas" },
								{
									value: "device_manager",
									name: "Gerenciador de Dispositivos",
								},
							]}
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
				</div>
			)}
			{isLoading && <UserEditeSkeleton />}
		</DialogContent>
	);
}
