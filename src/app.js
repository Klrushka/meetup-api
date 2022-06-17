import express from 'express'
import errorMiddleware from './middlewares/error.middleware.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI  from 'swagger-ui-express'
import swaggerConfig from './config/swagger.config.js'

class App {
    constructor(routes) {
        
        this.app = express()
        this.port = process.env.PORT ?? 3000
        this.specs = swaggerJSDoc(swaggerConfig)


        this.initMiddleware()
        this.initRoutes(routes)
        this.initErrorHandling()

    

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`)
        })
    }

    initMiddleware() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(this.specs))
    }

    initRoutes(routes) {
        routes.forEach(route => this.app.use('/api', route.router))
    }

    initErrorHandling(){
        this.app.use(errorMiddleware)
    }

}

export default App
