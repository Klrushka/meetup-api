import 'dotenv/config'

import App from './app.js'
import MeetupRoutes from './routes/meetup.routes.js'

const app = new App([
    new MeetupRoutes(),
])

app.listen()
