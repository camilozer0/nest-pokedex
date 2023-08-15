import { IsInt, IsPositive, MinLength } from "class-validator";

export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @MinLength(1)
    no: number;

    @IsInt()
    @IsPositive()
    @MinLength(1)
    name: string;
}
