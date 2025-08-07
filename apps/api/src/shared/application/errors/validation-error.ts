import { UseCaseErrors } from '@/shared/errors/use-case-errors'

export class ValidationError extends Error implements UseCaseErrors {
  constructor(message: string) {
    super(message)
  }
}
