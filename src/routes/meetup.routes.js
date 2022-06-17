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
       
        /**
         * @swagger
         * /books:
         *   get:
         *     summary: Returns the list of all the books
         *     tags: [Books]
         *     responses:
         *       200:
         *         description: The list of the books
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Book'
         */

        this.router.get(`${this.path}`, this.meetupController.getMeetups)
        this.router.get(`${this.path}/:id`, this.meetupController.getMeetup)
        this.router.put(`${this.path}/:id`, this.meetupController.updateMeetup)
        this.router.delete(`${this.path}/:id`, this.meetupController.deleteMeetup)
    }
}

export default MeetupRoutes
