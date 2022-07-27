import 'dotenv/config'

import App from './app.js'
import AuthentificationRoutes from './routes/authentification.routes.js'
import MeetupRoutes from './routes/meetup.routes.js'

const app = new App([new MeetupRoutes(), new AuthentificationRoutes()])

app.listen()
