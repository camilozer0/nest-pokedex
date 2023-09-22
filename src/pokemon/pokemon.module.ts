import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        // este no es el nombre del pokemon, tener cuidado
        name: Pokemon.name,
        // importamos el esquema
        schema: PokemonSchema,
      },
    ]),
  ],
  exports: [
    MongooseModule,
  ]
})
export class PokemonModule {}
