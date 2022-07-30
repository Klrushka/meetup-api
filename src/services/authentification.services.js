import HttpException from '../exceptions/http.exception.js'
import User from '../models/user.js'
import db from './db/db.js'
import AuthentificationValidator from './validators/authentification.validator.js'
import UserValidator from './validators/user.validator.js'
import jwt from 'jsonwebtoken'
import Logger from './logger.js'
import GoogleUser from '../models/google.user.js'

const generateJwt = (id, roles) => {
    const payload = {
        id,
        roles,
    }

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class AuthentificationServices {
    constructor() {
        this.authentificationValidator = new AuthentificationValidator()
        this.userValidator = new UserValidator()
        this.logger = new Logger()
    }

    async getUserByGoogleEmail(email) {
        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
            email,
        ])

        return user.rows[0] ? new GoogleUser(user.rows[0]) : null
    }

    async getUserByEmail(email) {
        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
            email,
        ])

        return user.rows[0] ? new User(user.rows[0]) : null
    }

    async isUserExist(email, table) {
        const user = await db.query(`SELECT * FROM ${table} WHERE email = $1`, [
            email,
        ])

        return user.rows[0] ? true : false
    }

    async createUser(body) {
        const { error } = this.userValidator.validate(body)

        if (error) {
            throw new HttpException(
                400,
                error.details.map((item) => item.message).join('\n')
            )
        }
        if (!this.isUserExist(body.email, 'users')) {
            throw new HttpException(
                400,
                `user with email: ${body.email} already exist`
            )
        }

        const user = new User(body)

        const newUser = await db.query(
            `INSERT INTO users (name, surname, telephone, email, hash, salt) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [
                user.name,
                user.surname,
                user.telephone,
                user.email,
                user.hash,
                user.salt,
            ]
        )

        this.logger.debug('User was created and added to BD')

        return generateJwt(newUser.rows[0].id, newUser.rows[0].roles)
    }

    async createGoogleUser(profile) {
        const user = new GoogleUser(profile)

        const newUser = await db.query(
            `INSERT INTO users ( name, surname, email) VALUES ($1, $2, $3) RETURNING *`,
            [user.name, user.surname, user.email]
        )

        this.logger.debug('GoogleUser was created and added to BD')

        return new GoogleUser(newUser.rows[0])
    }
}

export { generateJwt }
export default AuthentificationServices
