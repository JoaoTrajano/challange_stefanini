import { ZodValidationPipe } from '@/shared/pipes/zod-validation'
import { personSchema } from '@people-management/validations'

export const CreatePersonBodyPipe = new ZodValidationPipe(personSchema)
