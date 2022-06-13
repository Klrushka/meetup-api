import {Router} from 'express'
import MeetupController from '../controllers/meetup.controller.js'
import MeetupServices from "../services/meetup.services.js";

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
        this.router.get(`${this.path}/find-by-title/:title`, this.meetupController.getMeetupByTitle)
        this.router.get(`${this.path}/find-by-tag/:tag`, this.meetupController.getMeetupByTag)
        this.router.get(`${this.path}/find-by-date/:date`, this.meetupController.getMeetupByDate)
    }
}

export default MeetupRoutes
