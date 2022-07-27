import express from 'express'
import errorMiddleware from './middlewares/error.middleware.js'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger/swagger.doc.json' assert { type: 'json' }
import passport from 'passport'
import './config/passport.js'
import Logger from './services/logger.js'

class App {
    constructor(routes) {
        this.app = express()
        this.port = process.env.PORT ?? 3000
        this.logger = new Logger()

        this.initMiddleware()
        this.initRoutes(routes)
        this.initErrorHandling()
    }

    listen() {
        this.app.listen(this.port, () => {
            this.logger.info(`Server started on port ${this.port}`)
        })
    }

    initMiddleware() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(passport.initialize())
        this.logger.info('Middlewares was initialized')
    }

    initRoutes(routes) {
        routes.forEach((route) => this.app.use('/api', route.router))
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
        this.logger.info('Routes was initialized')
    }

    initErrorHandling() {
        this.app.use(errorMiddleware)
        this.logger.info('Error handler was initialized')
    }
}

export default App
