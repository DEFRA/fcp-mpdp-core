import pg from 'pg'

const { Client } = pg

export const dbClient = new Client({
  host: 'postgres',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'fcp_mpdp_backend'
})