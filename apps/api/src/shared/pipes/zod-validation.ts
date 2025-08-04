import { BadRequestException, PipeTransform } from '@nestjs/common'
import { z } from '@people-management/validations'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      // if (error instanceof z.ZodError) {
      //   throw new BadRequestException({
      //     message: 'Validation failed',
      //     statusCode: 400,
      //     errors: fromZodError(error),
      //   })
      // }

      throw new BadRequestException('Validation failed')
    }
  }
}
