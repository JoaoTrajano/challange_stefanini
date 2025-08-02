import { ZodValidationPipe } from '@/shared/pipes/zod-validation'

import * as Validations from '@people-management/validations'

export const CreatePersonBodyPipe = new ZodValidationPipe(
  Validations.personSchema
)
