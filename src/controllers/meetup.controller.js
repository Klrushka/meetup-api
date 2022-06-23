import HttpException from '../exceptions/http.exception.js'
import MeetupServices from '../services/meetup.services.js'

class MeetupController {
    constructor() {
        this.service = new MeetupServices()

        Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter((prop) => typeof this[prop] === 'function')
            .forEach((prop) => (this[prop] = this[prop].bind(this)))
    }

    async createMeetup(req, res, next) {
        try {
            if (req.auth.roles.find((item) => item === 'admin')) {
                const meetup = await this.service.create(req.body)
                res.status(201).json(meetup)
            } else {
                next(new HttpException(403, "Don't have access"))
            }
        } catch (err) {
            next(err)
        }
    }

    async getMeetups(req, res, next) {
        try {
            if (
                req.auth.roles.find(
                    (item) => item === 'admin' || item === 'user'
                )
            ) {
                const meetup = await this.service.getAll(req.query)
                res.status(200).json(meetup)
            } else {
                next(new HttpException(403, "Don't have access"))
            }
        } catch (err) {
            next(err)
        }
    }

    async getMeetup(req, res, next) {
        try {
            if (
                req.auth.roles.find(
                    (item) => item === 'admin' || item === 'user'
                )
            ) {
                const meetup = await this.service.getOne(req.params.id)
                res.status(200).json(meetup)
            } else {
                next(new HttpException(403, "Don't have access"))
            }
        } catch (err) {
            next(err)
        }
    }

    async updateMeetup(req, res, next) {
        try {
            if (req.auth.roles.find((item) => item === 'admin')) {
                const meetup = await this.service.update(
                    req.body,
                    req.params.id
                )
                res.status(200).json(meetup)
            } else {
                next(new HttpException(403, "Don't have access"))
            }
        } catch (err) {
            next(err)
        }
    }

    async deleteMeetup(req, res, next) {
        try {
            if (req.auth.roles.find((item) => item === 'admin')) {
                const meetup = await this.service.delete(req.params.id)
                res.status(204).json(meetup)
            } else {
                next(new HttpException(403, "Don't have access"))
            }
        } catch (err) {
            next(err)
        }
    }
}

export default MeetupController
