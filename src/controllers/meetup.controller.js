import db from '../services/db/db.js'
import HttpException from '../exceptions/http.exception.js';

class MeetupController {
    async createMeetup(req, res) {
        const {
            title,
            description,
            tags,
            date
        } = req.body

        try {
            const meetup = await db.query(`INSERT INTO meetups (title, description, tags, date) values ($1, $2, $3, $4) RETURNING *`,
                [title, description, tags, date])

            res.status(201).json(meetup.rows)
        } catch (err) {
            res.status(500).json(new HttpException(500, 'Can\'t execute post request'))             // TODO status code
        }


    }

    async getMeetups(req, res) {
        try{
            const meetups = await db.query('SELECT * FROM meetups')
            res.status(200).json(meetups.rows)
        } catch (err){
            res.status(404).json(new HttpException(404, 'Meetups doesn\'t exist'))               // TODO status code
        }

    }

    async getMeetup(req, res) {
        try {
            const id = req.params.id
            const meetup = await db.query(`SELECT * FROM meetups where id = $1`, [id])
            res.status(200).json(meetup.rows)
        } catch (err){
            res.status(404).json(new HttpException(404, 'Meetup doesn\'t exist'))
        }
    }

    async updateMeetup(req, res) {
        const {
            title,
            description,
            tags,
            date
        } = req.body

        const id = req.params.id

        try{
            const meetup = await db.query(`UPDATE meetups set title = $1, description = $2, tags = $3, date = $4 where id = $5 RETURNING *`,
                [title, description, tags, date, id])
            res.status(200).json(meetup.rows)
        } catch (err){
            res.status(404).json(new HttpException(404, 'Can\'t execute PUT request maybe invalid id'))
        }

    }

    async deleteMeetup(req, res) {

        try{
            const id = req.params.id
            const meetup = await db.query(`DELETE FROM meetups WHERE id = $1`, [id])
            res.status(204).json(meetup.rows)
        } catch (err){
            res.status(404).json(new HttpException(404, 'Can\'t execute DELETE request maybe invalid id'))
        }
    }

}


export default MeetupController