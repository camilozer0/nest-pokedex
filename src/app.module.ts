import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';

@Module({
  imports: [
    // Se inserta al inicio para evitar problemas de carga
    ConfigModule.forRoot({
      load: [ EnvConfiguration ]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot( process.env.MONGO_DB ),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // para ver las variable de entorno que corren por defecto en Node
 /*  constructor() {
    console.log( process.env )
  } */
}
