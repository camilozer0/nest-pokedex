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
      this.handleExceptions(error);
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

  async update(vS: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne( vS );
    if ( updatePokemonDto.name ) 
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

    try {
      await pokemon.updateOne( updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
    
  }

  async remove(id: string) {
    /* Si quiero borrar el pokemon con id, nombre o no
    const pokemon = await this.findOne( id );
    await pokemon.deleteOne(); */
    
    // this.pokemonModel.findByIdAndDelete( id ); 
    // const result = await this.pokemonModel.findByIdAndDelete(id);
    const { acknowledged, deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) 
    throw new BadRequestException(`Pokemon with id "${ id }" not found`)
    return;
  }

  // para evitar el codigo duplicado hago una funcion y la llamo
  private handleExceptions( error: any) {
    if (error.code === 11000) {
      // lanzamos el badrequest y esto tambien nos cambia el status al devolver la respuesta
      throw new BadRequestException(`Pokemon already exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    // si no es el error 11000, es otro tipo de problema y lanzo el internalserver
    throw new InternalServerErrorException(`Can't create pokemon - Check server logs`);
  }
  
}
