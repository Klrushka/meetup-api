import express from 'express'
import errorMiddleware from './middlewares/error.middleware.js'

class App {
    constructor(routes) {
        this.app = express()
        this.port = process.env.PORT ?? 3000


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
    }

    initRoutes(routes) {
        routes.forEach(route => this.app.use('/api', route.router))
    }

    initErrorHandling(){
        this.app.use(errorMiddleware)
    }

}

export default App
