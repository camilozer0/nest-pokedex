import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonModule } from '../pokemon/pokemon.module';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  constructor (
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}

  // Se crea una dependencia de axios
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    

    // Si hay pokemons previamente en la base de datos los borro
    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon/?limit=650')

    // creo un arreglo de tipo nombre, no, para luego insertarlo en la base de datos
    const pokemonToInsert: { name: string, no: number }[] = []
  
    data.results.forEach(({ name, url}) => {
    const segments = url.split('/');
    const no = +segments[ segments.length - 2 ];
    pokemonToInsert.push({ name, no })
  }) 
  // crea una sola insersion con muchas entradas, es la recomendacion
    await this.pokemonModel.insertMany(pokemonToInsert)
    return 'seed Executed';
  }

}
