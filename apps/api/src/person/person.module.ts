import { Module } from '@nestjs/common'

import { PrismaService } from '@/shared/infrastructure/database/postgres/adapters/prisma/prisma.service'

import {
  CreatePersonUseCase,
  DeletePersonUseCase,
  FetchPersonUseCase,
  UpdatePersonUseCase,
} from './application/use-cases'
import { PersonRepository } from './domain/repositories/person.repository'
import { PersonPrismaRepository } from './infrastructure/database/prisma/repositories/person-prisma-repository'
import { PersonController } from './infrastructure/http/presentation/controllers/person.controller'

@Module({
  controllers: [PersonController],
  providers: [
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'PersonRepository',
      useFactory: (prismaService: PrismaService) => {
        return new PersonPrismaRepository(prismaService)
      },
      inject: ['PrismaService'],
    },
    {
      provide: 'CreatePersonUseCase',
      useFactory: (personRepository: PersonRepository) => {
        return new CreatePersonUseCase(personRepository)
      },
      inject: ['PersonRepository'],
    },
    {
      provide: 'UpdatePersonUseCase',
      useFactory: (personRepository: PersonRepository) => {
        return new UpdatePersonUseCase(personRepository)
      },
      inject: ['PersonRepository'],
    },
    {
      provide: 'DeletePersonUseCase',
      useFactory: (personRepository: PersonRepository) => {
        return new DeletePersonUseCase(personRepository)
      },
      inject: ['PersonRepository'],
    },
    {
      provide: 'FetchPersonUseCase',
      useFactory: (personRepository: PersonRepository) => {
        return new FetchPersonUseCase(personRepository)
      },
      inject: ['PersonRepository'],
    },
  ],
})
export class PersonsModule {}
