import HttpException from "../exceptions/http.exception.js"
import User from "../models/user.js"
import db from "./db/db.js"
import UserDto from "./dto/user.dto.js"
import AuthentificationValidator from "./validators/authentification.validator.js"
import UserValidator from "./validators/user.validator.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Strategy } from "passport-jwt"
import { ExtractJwt } from "passport-jwt"
import passport from "passport"

const generateJwt = (id, roles) => {
    const date = new Date()
    date.setDate(date.getDate() + 1)

    const payload = {
        id,
        roles,
        expiration: date.getTime(),
    }

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" })
}

class AuthentificationServices {
    constructor() {
        this.authentificationValidator = new AuthentificationValidator()
        this.userValidator = new UserValidator()
    }

    async getUserByEmail(email) {
        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
            email,
        ])

        return user.rows[0] ? new User(user.rows[0]) : null
    }

    async isUserExist(email) {
        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
            email,
        ])

        return user.rows[0] ? true : false
    }

    async createUser(body) {
        const { error } = this.userValidator.validate(body)

        if (error) {
            throw new HttpException(
                400,
                error.details.map((item) => item.message).join("\n")
            )
        }
        if (!this.isUserExist(body.email)) {
            throw new HttpException(
                400,
                `user with email: ${body.email} already exist`
            )
        }

        const user = new User(body)
        console.log(user)

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

        return generateJwt(newUser.rows[0].id, newUser.rows[0].roles)
    }
}

export { generateJwt }
export default AuthentificationServices
