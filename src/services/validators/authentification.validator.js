import joi from "joi"

class AuthentificationValidator {
    constructor(data) {
        this.schema = joi.object({
            email: joi.string().required(),
            password: joi.string().required(),
        })
    }

    validate(data) {
        return this.schema.validate(data)
    }
}

export default AuthentificationValidator
