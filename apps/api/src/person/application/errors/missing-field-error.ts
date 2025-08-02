import { UseCaseErrors } from '@/shared/errors/use-case-errors'

export class MissingFieldError extends Error implements UseCaseErrors {
  constructor(message: string) {
    super(message)
  }
}
