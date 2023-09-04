import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    // con el decorador insertamos el modelo (implmentacion de nest para trabajar con modelos)
    @InjectModel(Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      // el error 11000 nos dice que el pokemon a crear ya esta creado
      if (error.code === 11000) {
        // lanzamos el badrequest y esto tambien nos cambia el status al devolver la respuesta
        throw new BadRequestException(`Pokemon already exists in db ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error);
      // si no es el error 11000, es otro tipo de problema y lanzo el internalserver
      throw new InternalServerErrorException(`Can't create pokemon - Check server logs`);
    }
    
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
