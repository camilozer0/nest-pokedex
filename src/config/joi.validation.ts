import * as Joi from 'joi';

// creo un validation schema para verificar que los datos que quiero si sean

export const JoiValidationSchema = Joi.object({
MONGO_DB: Joi.required(),
PORT: Joi.number().default(3005),
DEFAULT_LIMIT: Joi.number().default(6),
})