import z from "zod";

export const personSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório."),
  gender: z.string().optional(),
  email: z.string().optional(),
  birthDate: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      const date = new Date(arg);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    return undefined;
  }, z.date()),
  birthplace: z.string().optional(),
  nationality: z.string().optional(),
  document: z.string().min(1, "CPF é obrigatório."),
});

export type Person = z.infer<typeof personSchema>;

export function validatePerson(data: Person) {
  return personSchema.safeParse(data);
}

export const fetchPersonQueryParamsSchema = z.object({
  page: z.string().optional(),
  perPage: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  document: z.string().optional(),
});

export type FetchPersonQueryParams = z.infer<
  typeof fetchPersonQueryParamsSchema
>;

export const updatePersonParamsSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  gender: z.string().optional(),
  birthDate: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) {
      const date = new Date(arg);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    return undefined;
  }, z.date().optional()),
  birthplace: z.string().optional(),
  nationality: z.string().optional(),
});

export type UpdatePersonParamsSchema = z.infer<typeof updatePersonParamsSchema>;

export const signInFormSchema = z.object({
  email: z.string().min(1, "Informe o seu e-mail."),
  password: z.string().min(1, "Informe a sua senha."),
});

export type SignInForm = z.infer<typeof signInFormSchema>;

export const signUpFormSchema = z
  .object({
    name: z.string().min(1, "Informe o seu nome."),
    email: z.string().email("Informe um e-mail válido."),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
    passwordConfirm: z.string().min(1, "A confirmação da senha é obrigatória."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message:
      "As senhas não coincidem. Por favor, verifique se ambas são iguais.",
    path: ["passwordConfirm"],
  });

export type SignUpForm = z.infer<typeof signUpFormSchema>;

export * as z from "zod";
export { fromZodError } from "zod-validation-error";
