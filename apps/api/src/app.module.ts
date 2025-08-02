import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PersonsModule } from './person/person.module'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    PersonsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
