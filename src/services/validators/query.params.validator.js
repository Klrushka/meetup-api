import joi from "joi"

class QueryParamsValidator {
    constructor() {
        this.schema = joi.object({
            title: joi.string(),
            tag: joi.any(),
            sort: joi.string(),
            page: joi.number(),
            date: joi.date(),
        })
    }

    validate(data) {
        return this.schema.validate(data)
    }
}

export default QueryParamsValidator
