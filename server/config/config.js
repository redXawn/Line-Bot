module.exports = {
  development: {
    username: 'andrew',
    password: null,
    database: 'line-dev',
    host: '127.0.0.1',
    port : '5432',
    dialect: 'postgres'
  },
  test: {
    username: process.env.POSTGRES_USER || 'andrew',
    password: process.env.POSTGRES_PASS || null,
    database: process.env.POSTGRES_DB || 'line-dev',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    port : process.env.POSTGRES_PORT || '5432',
    dialect: 'postgres',
    dialectOptions: { ssl: { require: true }}
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port : process.env.POSTGRES_PORT,
    dialect: 'postgres',
    dialectOptions: { ssl: { require: true }}
  },
};
