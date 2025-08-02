import z from "zod";

export const personSchema = z.object({
  name: z.string().min(2).max(100).nonempty(),
  document: z.string().min(1).max(20).nonempty(),
  birthDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export type Person = z.infer<typeof personSchema>;

export function validatePerson(data: Person) {
  return personSchema.safeParse(data);
}
