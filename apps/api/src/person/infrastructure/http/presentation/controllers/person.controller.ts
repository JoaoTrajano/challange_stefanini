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
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common'
import * as Validations from '@people-management/validations'
import {
  CreatePersonBodyPipe,
  FetchPersonsQueryParamsPipe,
} from '../pipes/validations'
import { PersonPresenter } from '../presenter/person.presenter'

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
  @UsePipes(CreatePersonBodyPipe)
  async createPerson(@Body() body: Validations.Person) {
    const result = await this.createPersonUseCase.execute({
      birthDate: body.birthDate,
      document: body.document,
      name: body.name,
      birthplace: body.birthplace,
      email: body.email,
      gender: body.gender,
      nationality: body.nationality,
    })
    if (result.isLeft()) throw new BadRequestException()

    return result.value
  }

  @Get()
  @UsePipes(FetchPersonsQueryParamsPipe)
  async fetchPersons(@Query() query: Validations.FetchPersonQueryParams) {
    console.log(query)
    const result = await this.fetchPersonUseCase.execute({
      document: query.document,
      email: query.email,
      name: query.name,
    })
    const mappedOutput = PersonPresenter.mapPersonsFromOutput(result)
    return mappedOutput
  }

  @Put(':id')
  async updatePerson(
    @Param('id') id: string,
    @Body() body: Validations.UpdatePersonParamsSchema
  ) {
    const result = await this.updatePersonUseCase.execute({
      id,
      email: body.email,
      gender: body.gender,
      birthDate: body.birthDate,
      birthplace: body.birthplace,
      nationality: body.nationality,
    })
    if (result.isLeft()) throw new BadRequestException()

    return result.value
  }

  @Delete(':id')
  @HttpCode(204)
  async deletePerson(@Param('id') id: string) {
    const result = await this.deletePersonUseCase.execute({ id })

    if (result.isLeft()) throw new BadRequestException()

    return result.value
  }
}
