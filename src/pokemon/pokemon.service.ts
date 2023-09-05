import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
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

  async findOne(vS: string) {
    let pokemon: Pokemon; 
    // por no
    if ( !isNaN(+vS) ) {
        pokemon = await this.pokemonModel.findOne({ no: vS });
    }

    // por mongoId
    if ( !pokemon && isValidObjectId( vS ) ) {
      pokemon = await this.pokemonModel.findById( vS )
    }

    //por nombre
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: vS.toLowerCase() })
    }

    if ( !pokemon ) throw new NotFoundException(`Pokemon with id, name or no "${ vS }" not found`)
    return pokemon
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
