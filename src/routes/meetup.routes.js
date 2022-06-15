import {Router} from 'express'
import MeetupController from '../controllers/meetup.controller.js'

class MeetupRoutes {
    constructor() {
        this.path = '/meetup'
        this.router = Router()
        this.meetupController = new MeetupController()

        this.initRoutes()
    }

    initRoutes(){
        this.router.post(`${this.path}`, this.meetupController.createMeetup)
        this.router.get(`${this.path}`, this.meetupController.getMeetups)
        this.router.get(`${this.path}/:id`, this.meetupController.getMeetup)
        this.router.put(`${this.path}/:id`, this.meetupController.updateMeetup)
        this.router.delete(`${this.path}/:id`, this.meetupController.deleteMeetup)
    }
}

export default MeetupRoutes
