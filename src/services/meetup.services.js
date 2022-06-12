import db from '../services/db/db.js'
import MeetupDto from "../services/dto/meetup.dto.js";
import MeetupValidator from "./validators/meetup.validator.js";

class MeetupServices {

    constructor() {
        this.validator = new MeetupValidator()
    }

    async create(req) {

        try {

            const meetupDto = new MeetupDto(req.body)

            const {error} = this.validator.validate(meetupDto)

            if (error){
                console.log(error)
                return null
            }

            const meetup = await db.query(`INSERT INTO meetups (title, description, tags, date)
                                           values ($1, $2, $3, $4)
                                           RETURNING *`,
                [meetupDto.title, meetupDto.description, meetupDto.tags, meetupDto.date])

            return new MeetupDto(meetup.rows[0])
        } catch (err) {
            return null
        }

    }

    async getAll(req) {
        try {
            const meetups = (await db.query('SELECT * FROM meetups'))

            return meetups.rows.map(item => {
                return new MeetupDto(item)
            })

        } catch (err) {
            return null
        }

    }

    async getOne(req) {
        try {
            const id = req.params.id
            const meetup = await db.query(`SELECT *
                                           FROM meetups
                                           where id = $1`, [id])

            return new MeetupDto(meetup.rows[0])
        } catch (err) {
            return null
        }
    }

    async update(req) {
        const meetupDto = new MeetupDto(req.body)

        const {error} = this.validator.validate(meetupDto)

        if (error){
            console.log(error)
            return null
        }

        const id = req.params.id

        try {
            const meetup = await db.query(`UPDATE meetups
                                           set title       = $1,
                                               description = $2,
                                               tags        = $3,
                                               date        = $4
                                           where id = $5
                                           RETURNING *`,
                [meetupDto.title, meetupDto.description, meetupDto.tags, meetupDto.date, id])

            return new MeetupDto(meetup.rows[0])
        } catch (err) {
            return null
        }

    }


    async delete(req) {

        try {
            const id = req.params.id
            const meetup = (await db.query(`DELETE
                                            FROM meetups
                                            WHERE id = $1`, [id]))

            return new MeetupDto(meetup.rows[0])
        } catch (err) {
            return null
        }
    }

}

export default MeetupServices
