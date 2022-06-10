import pg from 'pg'
import dbConfig from '../../config/db.config.js'

const db = new pg.Pool(dbConfig)

export default db
