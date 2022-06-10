const express = require('express')
const router = express.Router()
const meetupController = require('../controllers/meetup.controller')

router.post('/meetup', meetupController.createMeetup)
router.get('/meetup', meetupController.getMeetups)
router.get('/meetup/:id', meetupController.getMeetup)
router.put('/meetup', meetupController.updateMeetup)
router.delete('/meetup/:id', meetupController.deleteMeetup)

module.exports = router


