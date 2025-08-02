import z from "zod";

export const personSchema = z.object({
  name: z.string().min(2).max(100).nonempty(),
  document: z.string().min(1).max(20).nonempty(),
  birthDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    })
    .transform((date) => new Date(date)),
});

export type Person = z.infer<typeof personSchema>;

export function validatePerson(data: Person) {
  return personSchema.safeParse(data);
}

export const fetchPersonQueryParamsSchema = z.object({
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

export * as z from "zod";
export { fromZodError } from "zod-validation-error";
