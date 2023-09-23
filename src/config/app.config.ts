// Tambien se puede llamar el archivo .env.config.ts

// Este archivo se usa para validar las variables de entorno, lo cargo en el AppModule

export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGO_DB,
    port: process.env.PORT || 3000,
    defaultLimit: +process.env.DEFAULT_LIMIT || 7,
});