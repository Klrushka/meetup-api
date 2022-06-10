import db from '../services/db/db.js'

class MeetupController {
    async createMeetup (req, res){
        const {
            title,
            description,
            tags,
            date
        } = req.body

        const meetup = await db.query(`INSERT INTO meetups (title, description, tags, date) values ($1, $2, $3, $4) RETURNING *`,
            [title,description, tags, date])

        res.status(201).json(meetup.rows)
    }

    async getMeetups (req, res){
        const meetups = await db.query('SELECT * FROM meetups')

        res.status(200).json(meetups.rows)
    }

    async getMeetup (req, res){
        const id = req.params.id
        const meetup = await db.query(`SELECT * FROM meetups where id = $1`, [id])
        res.status(200).json(meetup.rows)
    }

    async updateMeetup (req, res){
        const {
            title,
            description,
            tags,
            date
        } = req.body

        const id = req.params.id

        const meetup = await db.query(`UPDATE meetups set title = $1, description = $2, tags = $3, date = $4 where id = $5 RETURNING *`,
            [title, description, tags, date, id])
        res.status(200).json(meetup.rows)
    }

    async deleteMeetup (req, res){
        const id = req.params.id

        const meetup = await db.query(`DELETE FROM meetups WHERE id = $1`, [id])

        res.status(204).json(meetup.rows)
    }

}


export default MeetupController