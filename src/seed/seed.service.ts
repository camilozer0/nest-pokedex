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
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon/?limit=10')
  data.results.forEach( async ({ name, url}) => {
    const segments = url.split('/');
    const no = +segments[ segments.length - 2 ];
    const pokemon = await this.pokemonModel.create( { name, no });
    console.log({ name, no})
  }) 
  return 'seed Executed';
  }

}
