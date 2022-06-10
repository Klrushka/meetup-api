const express = require('express')
const app = express()
const meetupRouter = require('./app/routes/meetup.routes.js')

const PORT = process.env.PORT ?? 3000


app.use(express.json())
app.use('/app', meetupRouter)


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})