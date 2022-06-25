import {Router} from 'express'
import MeetupController from '../controllers/meetup.controller.js'
import { expressjwt } from 'express-jwt';
class MeetupRoutes {
    constructor() {
        this.router = Router()
        this.meetupController = new MeetupController()
        this.authentification = expressjwt({
            secret: process.env.SECRET_KEY,
            algorithms: ["HS256"],
            /*requestProperty: 'auth' // by default req.auth*/
        })

        this.initRoutes()
    }

    initRoutes(){
        this.router.get(`/meetup`,this.authentification,this.meetupController.getMeetups
        /*
        #swagger.tags = ['Meetups']
        #swagger.description = 'get all meetups'
        #swagger.parameters['title'] = {
            in: 'query',
            description: 'search by title',
            type: 'string'
        }
        #swagger.parameters['tag'] = {
            in: 'query',
            description: 'filter by tag',
            type: 'array'
        }
        #swagger.parameters['date'] = {
            in: 'query',
            description: 'search by date',
            type: 'string'
        }
        #swagger.parameters['page'] = {
            in: 'query',
            description: 'number of page',
            type: 'string'
        }
        #swagger.parameters['sort'] = {
            in: 'query',
            description: 'sort by field',
            type: 'string'
        }
        #swagger.responses[200] ={
            description: 'return array of meeetups',
            schema: [{$ref: '#/definitions/Meetup'}]
        }
        */
        )
        this.router.get(`/meetup/:id`,this.authentification, this.meetupController.getMeetup
        /*   
        #swagger.tags = ['Meetups']
        #swagger.description = 'get meetup by id'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'meetup id',
            type: 'number'
        }
        #swagger.responses[200] = {
            description: 'return meeetup by id',
            schema: {$ref: '#/definitions/Meetup'}
        }
        #swagger.responses[404] = {
            description: 'Can\'t find meetup with id = {id}',
            schema: {$ref: '#/definitions/HttpException'}
        }    
        */
        )
        this.router.post(`/meetup`,this.authentification,this.meetupController.createMeetup
        /*
        #swagger.tags = ['Meetups']
        #swagger.description = 'create new Meetup'
        #swagger.parameters['title'] = {
            in: 'body',
            description: 'title field',
            type: 'string'
        }
        #swagger.parameters['description'] = {
            in: 'body',
            description: 'description field',
            type: 'string'
        }
        #swagger.parameters['tags'] = {
            in: 'body',
            description: 'tags field',
            type: 'array'
        }
        #swagger.parameters['date'] = {
            in: 'body',
            description: 'date field',
            type: 'string'
        }
        #swagger.responses[201] = {
            description: 'meetup created',
            schema: {$ref: '#/definitions/Meetup'}
        }
        #swagger.responses[404] = {
            description: 'when invalid request',
            schema: {$ref: '#/definitions/HttpException'}
        }
        */
        )
        this.router.put(`/meetup/:id`, this.authentification, this.meetupController.updateMeetup
        /*
        #swagger.tags = ['Meetups']
        #swagger.description = 'update Meetup by id'
        #swagger.parameters['title'] = {
            in: 'body',
            description: 'title field',
            type: 'string'
        }
        #swagger.parameters['description'] = {
            in: 'body',
            description: 'description field',
            type: 'string'
        }
        #swagger.parameters['tags'] = {
            in: 'body',
            description: 'tags field',
            type: 'array'
        }
        #swagger.parameters['date'] = {
            in: 'body',
            description: 'date field',
            type: 'string'
        }
        #swagger.responses[200] = {
            description: 'meetup created',
            schema: {$ref: '#/definitions/Meetup'}
        }
        #swagger.responses[404] = {
            description: 'when invalid request',
            schema: {$ref: '#/definitions/HttpException'}
        }
        */
        )
        this.router.delete(`/meetup/:id`,this.authentification, this.meetupController.deleteMeetup
         /*   
        #swagger.tags = ['Meetups']
        #swagger.description = 'id'
        #swagger.parameters['id'] = {
            in: 'path',
            description: 'meetup id',
            type: 'number'
        }
        #swagger.responses[204] = {
            description: 'if all good return empty response',
        } 
        */
        )
    }
}

export default MeetupRoutes
