import {
  CreatePersonUseCase,
  DeletePersonUseCase,
  FetchPersonUseCase,
  ShowPersonUseCase,
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
    private readonly fetchPersonUseCase: FetchPersonUseCase,
    @Inject('ShowPersonUseCase')
    private readonly showPersonUseCase: ShowPersonUseCase
  ) {}

  @Post()
  @UsePipes(CreatePersonBodyPipe)
  async createPerson(@Body() body: Validations.Person) {
    const output = await this.createPersonUseCase.execute({
      birthDate: body.birthDate,
      document: body.document,
      name: body.name,
      birthplace: body.birthplace,
      email: body.email,
      gender: body.gender,
      nationality: body.nationality,
    })

    if (output.isLeft()) {
      const error = output.value
      throw new BadRequestException(error.message)
    }

    const mappedOutupt = PersonPresenter.mapPersonFromInput(output.value.person)
    return mappedOutupt
  }

  @Get()
  @UsePipes(FetchPersonsQueryParamsPipe)
  async fetchPersons(@Query() query: Validations.FetchPersonQueryParams) {
    const output = await this.fetchPersonUseCase.execute({
      page: query.page && +query.page,
      perPage: query.perPage && +query.perPage,
      document: query.document,
      email: query.email,
      name: query.name,
    })

    const mappedOutput = PersonPresenter.mapPersonsFromOutput(output)
    return mappedOutput
  }

  @Get('/show/:id')
  async showPerson(@Param('id') id: string) {
    const output = await this.showPersonUseCase.execute({
      personId: id,
    })

    if (output.isLeft()) {
      const error = output.value
      throw new BadRequestException(error.message)
    }

    const mappedOutupt = PersonPresenter.mapPersonFromInput(output.value.person)
    return mappedOutupt
  }

  @Put(':id')
  async updatePerson(
    @Param('id') id: string,
    @Body() body: Validations.UpdatePersonParamsSchema
  ) {
    const output = await this.updatePersonUseCase.execute({
      id,
      name: body.name,
      email: body.email,
      gender: body.gender,
      birthDate: body.birthDate,
      birthplace: body.birthplace,
      nationality: body.nationality,
    })

    if (output.isLeft()) {
      const error = output.value
      throw new BadRequestException(error.message)
    }

    const mappedOutupt = PersonPresenter.mapPersonFromInput(output.value.person)
    return mappedOutupt
  }

  @Delete(':id')
  @HttpCode(204)
  async deletePerson(@Param('id') id: string) {
    const output = await this.deletePersonUseCase.execute({ id })

    if (output.isLeft()) {
      const error = output.value
      throw new BadRequestException(error.message)
    }

    const mappedOutupt = PersonPresenter.mapPersonFromInput(output.value.person)
    return mappedOutupt
  }
}
