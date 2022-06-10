const db = require('../services/db/db.js')

class MeetupController{
    async createMeetup (req, res){
        const {
            id,
            title,
            description,
            tags,
            date
        } = req.body

        const meetup = await db.query(`INSERT INTO meetups (title, description, tags, date) values (${1}, ${2}, ${3}, ${4}) RETURNING *`,
            [title,description, tags, date])

        res.json(meetup.rows)
        console.log(meetup)

    }
    async getMeetups (req, res){
        const meetups = await db.query('SELECT * FROM meetups')
        res.json(meetups.rows)
    }

    async getMeetup (req, res){
        const id = req.params.id
        const meetup = await db.query(`SELECT * FROM meetups where id = $1`, [id])
        res.json(meetup.rows)
    }
    async updateMeetup (req, res){
        const {
            id,
            title,
            description,
            tags,
            date
        } = req.body

        const meetup = await db.query(`UPDATE meetups set title = $1, description = $2, tags = $3, date = $4 where id = $5 RETURNING *`,
            [title, description, tags, date, id])
        res.json(meetup.rows)
    }

    async deleteMeetup (req, res){

    }

}

module.exports = new MeetupController()