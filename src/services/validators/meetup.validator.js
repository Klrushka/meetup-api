import joi from 'joi'

class MeetupValidator{

    constructor() {
        this.schema = joi.object({
            id: joi.number().min(0).default(null),
            title: joi.string().max(500).required(),
            description: joi.string().max(1000),
            tags: joi.array(),
            date: joi.date(),
        })
    }

    validate(data){
        return this.schema.validate(data)
    }

}

export default MeetupValidator
