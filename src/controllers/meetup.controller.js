import HttpException from '../exceptions/http.exception.js';
import MeetupServices from '../services/meetup.services.js';

class MeetupController {

    constructor() {
        this.service = new MeetupServices()
        this.createMeetup = this.createMeetup.bind(this)
        this.getMeetups = this.getMeetups.bind(this)
        this.getMeetup = this.getMeetup.bind(this)
        this.updateMeetup = this.updateMeetup.bind(this)
        this.deleteMeetup = this.deleteMeetup.bind(this)
        this.getMeetupByTitle = this.getMeetupByTitle.bind(this)
        this.getMeetupByTag = this.getMeetupByTag.bind(this)
        this.getMeetupByDate = this.getMeetupByDate.bind(this)
    }

    async createMeetup(req, res) {

        const meetup = await this.service.create(req)

        meetup ? res.status(201).json(meetup) : res.status(500).json(new HttpException(500,         // TODO status code
            'Can\'t execute post request'))
    }

    async getMeetups(req, res) {

        const meetup = await this.service.getAll(req)

        meetup ? res.status(200).json(meetup) : res.status(404).json(new HttpException(404,
            'Meetups doesn\'t exist'))  // TODO status code

    }

    async getMeetup(req, res) {

        const meetup = await this.service.getOne(req)

        meetup ? res.status(200).json(meetup) : res.status(404).json(new HttpException(404,
            'Meetup doesn\'t exist'))

    }

    async updateMeetup(req, res) {

        const meetup = await this.service.update(req)

        meetup ? res.status(200).json(meetup) : res.status(404).json(new HttpException(404,
            'Can\'t execute PUT request maybe invalid id'))

    }

    async deleteMeetup(req, res) {

        const meetup = await this.service.delete(req)

        meetup ? res.status(404).json(new HttpException(404,
            'Can\'t execute DELETE request maybe invalid id')) : res.status(204).json(meetup)

    }

    async getMeetupByTitle(req, res) {

        const meetup = await this.service.getByTitle(req)


        meetup ? res.status(200).json(meetup) : res.status(404).json(new HttpException(404,
            'No meetups like this title'))

    }

    async getMeetupByTag(req, res){

        const meetup = await this.service.getByTag(req)

        meetup ? res.status(200).json(meetup) : res.status(404).json(new HttpException(404,
            'No meetups like this title'))

    }

    async getMeetupByDate(req,res){

        const meetup = await this.service.getByDate(req)

        meetup ? res.status(200).json(meetup) : res.status(404).json(new HttpException(404,
            'No meetups with this date'))

    }
}

export default MeetupController
