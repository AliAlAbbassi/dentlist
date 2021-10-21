import path from 'path'

export default {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: true,
  synchronize: true,
  migrations: [path.join(__dirname, './migrations/*')],
  entities: [path.join(__dirname, './entities/*.ts')],
  cli: {
    entitiesDir: path.join(__dirname, './src/entities'),
    migrationsDir: path.join(__dirname, './src/migrations'),
  },
}
