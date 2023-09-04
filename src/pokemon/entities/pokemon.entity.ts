import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Extiende de documentos porque en mongo insertamos documentos y no registros en tablas
@Schema()
export class Pokemon extends Document {
  // defino el decorador property y le defino las opciones
  @Prop({
    unique: true,
    index: true,
  })
  name: string;
  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );
