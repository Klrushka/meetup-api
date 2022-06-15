import db from '../services/db/db.js'
import MeetupDto from "../services/dto/meetup.dto.js";
import MeetupValidator from "./validators/meetup.validator.js";
import HttpException from "../exceptions/http.exception.js";
import QueryParamsValidator from "./validators/query.params.validator.js";

class MeetupServices {

    constructor() {
        this.validator = new MeetupValidator()
        this.queryValidator = new QueryParamsValidator()
    }

    async create(body) {

        const meetupDto = new MeetupDto(body)

        const {error} = this.validator.validate(meetupDto)

        if (error) {
            throw new HttpException(400, error.details.map((item) => item.message).join('\n'))
        }

        const meetup = await db.query(`INSERT INTO meetups (title, description, tags, date)
                                       values ($1, $2, $3, $4)
                                       RETURNING *`,
            [meetupDto.title, meetupDto.description, meetupDto.tags, meetupDto.date])

        return new MeetupDto(meetup.rows[0])
    }

    async getAll(query) {

        let sqlQuery = 'SELECT * FROM meetups'

        const titleSql = `(title LIKE \'\%${query.title}\%\')`
        const tagsSql = `(tags && '\{${query.tag}\}')`
        const dateSql = `(date = '${query.date}')`
        const limitSql = `LIMIT ${query.page * 10}`
        const sortSql = `ORDER BY ${query.sort} DESC`
        let moreOneParamFlag = false
        let whereFlag = true

        const isAndWhereNeed = () => {
            if (whereFlag){
                sqlQuery += ' WHERE '
                whereFlag = false
            }

            if (moreOneParamFlag){
                sqlQuery += ' AND '
            } else {
                moreOneParamFlag = true
            }
        }

        const {error} = this.queryValidator.validate(query)

        if (error) {
            throw new HttpException(400, error.details.map((item) => item.message).join('\n'))
        }


        Object.getOwnPropertyNames(query).forEach(item => {
            switch (item) {
                case 'title':
                    isAndWhereNeed()
                    sqlQuery += ` ${titleSql}`
                    break
                case 'tag':
                    isAndWhereNeed()
                    sqlQuery += ` ${tagsSql}`
                    break
                case 'date':
                   isAndWhereNeed()
                    sqlQuery += ` ${dateSql}`
                    break
                case 'page':
                    sqlQuery += ` ${limitSql}`
                    break
                case 'sort':
                    sqlQuery += ` ${sortSql}`
                    break
            }
        })

        const meetups = await db.query(sqlQuery)

        return meetups.rows.map(item => {
            return new MeetupDto(item)
        })

    }

    async getOne(id) {
        const meetup = await db.query(`SELECT *
                                       FROM meetups
                                       where id = $1`, [id])

        if (meetup.rows.length === 0) {
            throw new HttpException(404, `Can't find meetup with id = ${id}`)
        }
        return new MeetupDto(meetup.rows[0])
    }

    async update(body, id) {
        const meetupDto = new MeetupDto(body)

        const {error} = this.validator.validate(meetupDto)

        if (error) {
            throw new HttpException(400, error.details.map((item) => item.message).join('\n'))
        }

        const meetup = await db.query(`UPDATE meetups
                                       set title       = $1,
                                           description = $2,
                                           tags        = $3,
                                           date        = $4
                                       where id = $5
                                       RETURNING *`,
            [meetupDto.title, meetupDto.description, meetupDto.tags, meetupDto.date, id])

        return new MeetupDto(meetup.rows[0])


    }


    async delete(id) {
        const meetup = await db.query(`DELETE
                                       FROM meetups
                                       WHERE id = $1`, [id])

        return new MeetupDto(meetup.rows[0])
    }

}

export default MeetupServices
