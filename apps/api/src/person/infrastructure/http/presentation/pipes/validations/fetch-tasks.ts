import { ZodValidationPipe } from '@/shared/pipes/zod-validation'

import { fetchPersonQueryParamsSchema } from '@people-management/validations'

export const FetchPersonsQueryParamsPipe = new ZodValidationPipe(
  fetchPersonQueryParamsSchema
)
