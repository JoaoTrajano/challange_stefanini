import {
  CreatePersonUseCase,
  DeletePersonUseCase,
  FetchPersonUseCase,
  UpdatePersonUseCase,
} from '@/person/application/use-cases'
import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common'
import { Person } from '@people-management/validations'

@Controller('persons')
export class PersonController {
  constructor(
    @Inject('CreatePersonUseCase')
    private readonly createPersonUseCase: CreatePersonUseCase,
    @Inject('UpdatePersonUseCase')
    private readonly updatePersonUseCase: UpdatePersonUseCase,
    @Inject('DeletePersonUseCase')
    private readonly deletePersonUseCase: DeletePersonUseCase,
    @Inject('FetchPersonUseCase')
    private readonly fetchPersonUseCase: FetchPersonUseCase
  ) {}

  @Post()
  async createPerson(@Body() body: Person) {
    const result = await this.createPersonUseCase.execute({
      birthDate: body.birthDate,
      document: body.document,
      name: body.name,
    })
    if (result.isLeft()) throw new BadRequestException()

    return result.value
  }

  //   @Get()
  //   @UsePipes(FetchPersonsQueryParamsPipe)
  //   async fetchPersons(@Query() query: FetchPersonsQueryParams) {
  //     const result = await this.fetchPersonsUseCase.execute({
  //       status: query.status,
  //     })

  //     return result.value
  //   }

  //   @Put(':id')
  //   async updatePerson(@Param('id') id: string, @Body() body: UpdatePersonBody) {
  //     const result = await this.updatePersonUseCase.execute({
  //       id,
  //       title: body.title,
  //     })
  //     if (result.isLeft()) throw new BadRequestException()

  //     return result.value
  //   }

  //   @Delete(':id')
  //   @HttpCode(204)
  //   async deletePerson(@Param('id') id: string) {
  //     const result = await this.deletePersonUseCase.execute({ id })

  //     if (result.isLeft()) throw new BadRequestException()

  //     return result.value
  //   }

  //   @Patch(':id')
  //   async patchPerson(
  //     @Param('id') id: string,
  //     @Body() body: UpdatePersonStatusBody
  //   ) {
  //     const result = await this.updatePersonStatusUseCase.execute({
  //       id,
  //       newStatus: body.newStatus,
  //     })
  //     if (result.isLeft()) throw new BadRequestException()

  //     return result.value
  //   }
}
