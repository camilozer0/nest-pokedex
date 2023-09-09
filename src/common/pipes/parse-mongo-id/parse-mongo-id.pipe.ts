import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    // console.log({ value, metadata })
    // Se comprueba si el id ingresado es un MongoID y se devuelve.
    if ( !isValidObjectId(value) ) {
      throw new BadRequestException(`${value} is not a valid MongoID`);
    }
    return value;
  }
}
