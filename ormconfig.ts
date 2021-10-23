// import path from 'path'

module.exports = [
  {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: ['dist/src/migration/*.ts'],
    entities: ['dist/src/entity/*.ts'],
    cli: {
      entitiesDir: 'dist/src/entity',
      migrationsDir: 'dist/src/migration',
    },
  },
]
