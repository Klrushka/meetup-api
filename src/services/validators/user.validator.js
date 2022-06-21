import joi from "joi"

class UserValidator {
    constructor(data) {
        this.schema = joi.object({
            name: joi.string().trim().min(2).max(30).required(),
            surname: joi.string().trim().min(2).max(30).required(),
            email: joi.string().trim().email().required(),
            password: joi.string().trim().min(5).required(),
            telephone: joi.string().trim().min(5).required(),
            role: joi.array().default(["user"]),
        })
    }

    validate(data) {
        return this.schema.validate(data)
    }
}

export default UserValidator
