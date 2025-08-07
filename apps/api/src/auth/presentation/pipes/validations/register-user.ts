import { ZodValidationPipe } from '@/shared/pipes/zod-validation'
import { signUpFormSchema } from '@people-management/validations'

export const RegisterUserBodyPipe = new ZodValidationPipe(signUpFormSchema)
