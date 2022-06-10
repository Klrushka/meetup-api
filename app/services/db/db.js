const pg = require('pg')
const dbConfig = require('../../config/db.config')

const pool = new pg.Pool(dbConfig)

module.exports = pool
