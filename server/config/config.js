const knex = require('knex')
const dotenv = require('dotenv')
dotenv.config();


const db = knex({
    client: 'pg',
    connection: {
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        port: process.env.DGPORT,
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {db}